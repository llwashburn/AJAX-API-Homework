//script for giphy
$(document).ready(function() {
            console.log("ready!");


            //create array of superheros set to topics -homework instructions
            var topics = ["Black Widow", "Wonder Woman", "Black Panther", "Thor", "Iron Man"];
            console.log(topics);
            //function that displays data from array on buttons
            function displayButtons() {
                //clearing button view prior to creating any new buttons
                $("#buttons-view").empty();
                for (var i = 0; i < topics.length; i++) {
                    //creating a button on html storing in variable Button
                    var Button = $("<button>");
                    //adding id of action to button
                    Button.addClass("hero");
                    //adding styling to the button 
                    Button.addClass("btn btn-primary");
                    //adding attribute data
                    Button.attr("data-name", topics[i]);
                    //adding the text of the hero and appending to button
                    Button.text(topics[i]);
                    $("#buttons-view").append(Button);
                    console.log("Button");
                }

            }
            //display buttons on page
            displayButtons();

            // empty gif 
            $("#buttons-view").empty();


            //use document.onclick to listen for click events on the hero class defined in function
            $(document).on("click", ".hero", function(event) {
                    event.preventDefault();
                    var hero = $(this).attr("data-name");
                    renderGifs(hero);

                })
                //function for creating text in submit form button
            $("#addName").on("click", function(event) {
                event.preventDefault();
                var newName = $("#name-input").val().trim();
                //adding the newName to the topics array
                topics.push(newName);
                displayButtons();





                // Constructing a URL to search Giphy for the name of the hero/topic in the array
                function renderGifs(hero) {
                    $("#gifs-appear-here").empty();
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        hero + "&api_key=PXpstlg4oIHxaKSGlVJ94m3NUxUCy7AF&limit=10";
                    console.log(queryURL);
                    console.log(hero);
                    //Performing our AJAX GET request
                    //for giphy api
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    })


                    // After the data comes back from the API
                    .done(function(response) {

                        //check in console
                        console.log(response);

                        // Storing an array of api results in the results variable
                        var results = response.data;

                        // Looping over every result item
                        for (var i = 0; i < results.length; i++) {
                            // Only taking action if the photo has an appropriate rating
                            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                // Creating a div with the class "item"
                                var gifDiv = $("<div class='item'>");
                                // Storing the result item's rating
                                var rating = results[i].rating;
                                // Creating an image tag
                                var hero = $("<img>");
                                // hero.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                                // hero.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                                // hero.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                                // hero.attr("data-state", "still"); // set the image state
                                // Giving the image tag an src attribute of a proprty pulled off the
                                // result item
                                hero.attr("src", results[i].hero.fixed_height.url);
                                // Appending the superhero we created to the "gifDiv" div we created
                                gifDiv.append(hero);
                                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                                $("#gifs-appear-here").prepend(gifDiv);

                            }
                        }
                    })

                    // ('img').on("click", function() {
                    //     function pausePlayGifs() {
                    //         var state = $(this).attr("data-state");
                    //         if (state === "still") {
                    //             $(this).attr("src", $(this).attr("data-animate"));
                    //             $(this).attr("data-state", "animate");
                    //         } else {
                    //             $(this).attr("src", $(this).attr("data-still"));
                    //             $(this).attr("data-state", "still");
                    //         }
                    //     }
                    // })
                }


            });