$(document).ready(function(){

    /* Function to show the title of each navigation button  and move
     * each navigation button when mouse enters
     */
    $(document).on("mouseenter", ".navButt", function() {
        $(this).find("img").animate({
            bottom: '15px' });
        $(this).find("h3").fadeTo( "slow", 1);
    });

    /* Function to hide the title of each navigation button  and move
     * each navigation button back to orignal position when mouse leaves
     */
    $(document).on("mouseleave", ".navButt", function() {
        $(this).find("img").animate({
            bottom: '0px'
        });
        $(this).find("h3").fadeTo( "slow", 0);
    });

    var currAnchor;
    var currAnchorPos;

    /* Function to move the speechTriangle dynamically as window resizes
     */
    $( window ).resize(function(){
        if( currAnchor != null) {
            currAnchorPos = currAnchor.position();
            var moveLeft = currAnchorPos.left + ( currAnchor.outerWidth() /2);
            $("#speechTriangle").animate({ left: ( moveLeft  - 25 ) }, 0);
        }
    });

    /* Function to:
     *  - move window into position of nav buttons
     *  - to move the speech triangle and make it appear/disappear when nav
     *    buttons are selected and deselected
     */
    $(document).on("click", ".navButt", function( event ){
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $("#homeNav").offset().top
        }, "slow");

        $(this).siblings("#navButtActive").removeAttr("id"); //set other active nav buttons as inactive
        if( $(this).attr("id") != "navButtActive" ) {
            $(this).attr("id", "navButtActive"); //set curr nav butt as active
    
            currAnchor = $(this);
            currAnchorPos = currAnchor.position();
            var moveLeft = currAnchorPos.left + ( $(this).outerWidth() /2);
            $("#speechTriangle").css("display", "block").animate({
                 left: moveLeft - 25
            }, "slow");

            var currPreview = $(this).find("a").attr("id");
            $.get( currPreview + '.html').done( function( data ) {
                $('#content').html(data).slideDown("slow");

            });
        }
        else {
            $("#speechTriangle").css("display", "none");
            $("#content").slideUp("fast", function() {
                $(this).css("display", "none");
            });
            $(this).removeAttr("id");
        }

    });

    // PORTFOLIO
    var currSlide = 1;
    // showSlides( currSlide );

    $(document).on("click", "#prevSlide", function() {
        currSlide--;
        showSlides();
    });

    $(document).on("click", "#nextSlide", function() {
        currSlide++;
        showSlides();
    });

    $(document).on("click", ".dot", function() {
        var currDot = $(this).attr("id");
        var currDotArray = currDot.split("");
        currDot = currDotArray[currDotArray.length - 1];
        currSlide = currDot;
        showSlides();
    });


    function showSlides() {
        var slideCount = document.getElementsByClassName('slides');
        var dotCount = document.getElementsByClassName('dot');
        if( currSlide >  slideCount.length)
            currSlide = 1;
        if( currSlide <= 0 )
            currSlide = slideCount.length;

        //turn off all slides first
        for( var i = 0; i < slideCount.length; i++ ) {
            slideCount[i].style.display = "none";
        }

        //turn off all active dots
        for( var i = 0; i < dotCount.length; i++ ) {
            dotCount[i].className = dotCount[i].className.replace( " activeDot", "");
        }

        slideCount[currSlide - 1].style.display = "block";
        dotCount[ currSlide - 1].className += " activeDot";
    }

});
