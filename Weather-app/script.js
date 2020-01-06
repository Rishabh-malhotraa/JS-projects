window.addEventListener("load", () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature ")
    let temperatureSectionSpan = document.querySelector(".temperature span")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                // console.log(position);
                const proxy = `https://cors-anywhere.herokuapp.com/`;
                const api = `${proxy}https://api.darksky.net/forecast/0e2e8d7aec2033f33d21a7f59ecc92ab/${latitude},${longitude}`

                fetch(api)
                    .then(response => {
                        return response.json();
                    })

                    .then(data => {
                            console.log(data);
                            const {
                                temperature,
                                summary,
                                icon
                            } = data.currently;

                            //Set DOM ELements from API
                            temperatureDegree.textContent = temperature;
                            temperatureDescription.textContent = summary;
                            locationTimeZone.textContent = "Timezone : " + data.timezone;

                            let celsius = (temperature - 32) * (5 / 9);
                            celsius = Math.round(celsius * 100) / 100;
                            // Set icons
                            setIcons(icon, document.querySelector(".icon"));

                            // change temperature from C/F

                            temperatureSection.addEventListener('click', () => {
                                if (temperatureSectionSpan.textContent === "°F") {
                                    temperatureSectionSpan.textContent = "°C";
                                    temperatureDegree.textContent = celsius
                                } else {
                                    temperatureSectionSpan.textContent = "°F";
                                    temperatureDegree.textContent = temperature;
                                }
                            })

                        }

                    );

            }

            /*else {
                h1.textContent = "Please allow your loction";
            }*/

        )
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

});