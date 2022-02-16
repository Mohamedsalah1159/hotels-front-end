let map;
let marker;
const allPoints = [
    [{ lat: 26.8206, lng: 30.8025 }, "200"],
    [{ lat: 29.8306, lng: 31.8125 }, "300"],
    [{ lat: 28.8406, lng: 33.8225 }, "400"],
    [{ lat: 27.8506, lng: 35.8325 }, "500"],
    [{ lat: 23.8606, lng: 30.8425 }, "600"],
];

// slider Buttons

    /*var prevArrow = '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path fill-rule="evenodd" d="M4.909.265a1 1 0 0 0-1.413.057l-3.231 3.5a1 1 0 0 0 0 1.357l3.231 3.5a1 1 0 0 0 1.47-1.357L3.284 5.5H13a1 1 0 1 0 0-2H3.284l1.682-1.822A1 1 0 0 0 4.909.265z" fill="#777e91"/></svg></button>',
    nextArrow = '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path fill-rule="evenodd" d="M9.091.265a1 1 0 0 1 1.413.057l3.231 3.5a1 1 0 0 1 0 1.357l-3.231 3.5a1 1 0 0 1-1.47-1.357L10.716 5.5H1a1 1 0 1 1 0-2h9.716L9.034 1.678A1 1 0 0 1 9.091.265z" fill="#23262f"/></svg></button>';*/

// Draw Map
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 26.8206, lng: 30.8025},
            zoom: 5
        });
        var card = `<div class="card map_card">
        <div class="carousel">
        <div><img src="https://picsum.photos/300/200?random=1"></div>
        <div><img src="https://picsum.photos/300/200?random=2"></div>
        <div><img src="https://picsum.photos/300/200?random=3"></div>
        <div><img src="https://picsum.photos/300/200?random=4"></div>
        <div><img src="https://picsum.photos/300/200?random=5"></div>
        <div><img src="https://picsum.photos/300/200?random=6"></div>
      </div>
        <a href="stays-product.html">
          <div class="card__body card_padding">
                                  
              <div class="card__line card-search">
                  <p>C i t y c e n t e r </p>
              
                <button class="button-circle-stroke button-small actions__favorite js-actions-favorite">
                  <svg class="icon icon-heart">
                    <use xlink:href="#icon-heart"></use>
                  </svg>
                  <svg class="icon icon-heart-fill">
                    <use xlink:href="#icon-heart-fill"></use>
                  </svg>
                </button>
              </div> <div class="card__title">Lorem Ipsum Hotel</div>
              <div class="card__options">
                <div class="card__option">
                  <i class="fas fa-bed"></i>1 bed
                </div>
                <div class="card__option">
                  <i class="fas fa-sink"></i>1 Bathroom
                </div>
                <div class="card__option">
                  <i class="fas fa-pizza-slice"></i>Kitchen
                </div>
      
                <div class="card__option">
                  <i class="fas fa-wifi"></i>Free wifi
                </div>
              </div>
              <div class="card__options">
                <div class="card__option">
                  <i class="fab fa-squarespace"></i>160 m2
                </div>
                <div class="card__option">
                  <i class="fas fa-utensils"></i>Breakfast only
                </div>
              </div>
              <p>Double or twin room with sea view</p>
              <div class="card__foot">
                <div class="card__flex card_search">
                  <div class="card__cost"><i class="fas fa-medal" aria-hidden="true"></i>Win 200 point 🔥</div>
                  <div class="card__rating cancellation">
                    <p>Free cancellation</p>
                    <div class="details_cancellation">
                      <div class="card__number">35 SAR </div>
                      <div class="card__reviews">/Week</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          </div>`

        // Create an info window to share between markers.
        infoWindow = new google.maps.InfoWindow({
            content:card
        });

        // loop in points
        allPoints.forEach(([position, title], i) => {

            // marker
                var marker = new MarkerWithLabel({
                    animation: google.maps.Animation.DROP,
                    position: position,
                    draggable: false,
                    raiseOnDrag: true,
                    map: map,
                    labelContent: `<div class="label_map">${title} SAR /<span style="font-size: 10px">Day</span> </div>`,
                    labelClass: "label_map_a",
                    labelStyle: {opacity: 0.75},
                    icon: {
                        url: ''
                    }
                });

            //events :

                // on marker click
                google.maps.event.addListener(marker, 'click', function () {
                    console.log(marker)
                    marker.label.labelDiv.childNodes[0].className = 'label_map_active'
                    if (marker) {
                        infoWindow.open(marker.getMap(), marker);
                    } else {
                        infoWindow.close();
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });

                // on hover
                google.maps.event.addListener(marker, "mouseover", function(e) {
                    this.label.labelDiv.childNodes[0].className = 'label_map_active'
                });

                //on blur
                google.maps.event.addListener(marker, "mouseout", function() {
                    this.label.labelDiv.childNodes[0].className = 'label_map'
                });
        });

        //slider

        google.maps.event.addListener(infoWindow, 'domready', function() {
                     $('.map_card .carousel').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: prevArrow,
                    nextArrow: nextArrow,
                    dots: false,
                    infinite: true,
                    speed: 500,
                });
        })
    }
    initMap()