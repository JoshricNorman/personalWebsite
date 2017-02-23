$(document).ready(function(){
    var currAnchor;
    var currAnchorId;
    var whichNav = -1;

    /* Function to move the speechTriangle dynamically as window resizes
     */
    $( window ).resize(function(){
        if( currAnchor != null) {
            var pos = currAnchor.position();
            var leftPos = pos.left;
            $("#speechTriangle").animate({ left: (leftPos  - 25 + 'px')}, 0);
        }
    });

    /* Function to show the title of each navigation button  and move
     * each navigation button when mouse enters
     */
    $(document).on("mouseenter", ".navButt", function() {
        $(this).find("img").animate({
            bottom: '15px' });
        $(this).find("figcaption").fadeTo( "slow", 1);
    });

    /* Function to hide the title of each navigation button  and move
     * each navigation button back to orignal position when mouse leaves
     */
    $(document).on("mouseleave", ".navButt", function() {
        $(this).find("img").animate({
            bottom: '0px'
        });
        $(this).find("figcaption").fadeTo( "slow", 0);
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
            currAnchor = $(this).find(".anchor");
            currAnchorId =  $(this).find(".anchor").attr("id");
            var pos = $(this).find(".anchor").position();
            var leftPos = pos.left;
            $("#speechTriangle").css("display", "block").animate({
                left: (leftPos  - 25 + 'px')
            });
            $("#content").slideDown("fast", function() {
                $(this).css("display", "block");
            });

            if( currAnchorId != null ) {
                if ( currAnchorId == "anchorAbout")
                    whichNav = 0;
                else if ( currAnchorId == "anchorResume")
                    whichNav = 1;
                else if ( currAnchorId == "anchorPortfolio")
                    whichNav = 2;
                else if ( currAnchorId == "anchorFind")
                    whichNav = 3;
                else if ( currAnchorId == "anchorContact")
                    whichNav = 4;
            }

            switch (whichNav) {
                case -1:
                case 0:
                        $("#aboutPreview").siblings().css("display", "none");
                        $("#aboutPreview").css("display", "flex");
                        break;
                case 1:
                        $("#resumePreview").siblings().css("display", "none");
                        $("#resumePreview").css("display", "flex");
                        break;
                case 2:
                        $("#portfolioPreview").siblings().css("display", "none");
                        $("#portfolioPreview").css("display", "flex");
                        break;
                case 3:
                        $("#findMePreview").siblings().css("display", "none");
                        $("#findMePreview").css("display", "flex");
                        break;
                case 4:
                        $("#contactMePreview").siblings().css("display", "none");
                        $("#contactMePreview").css("display", "block");
                        break;
            }
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
    showSlides( currSlide );

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
