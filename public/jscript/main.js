//<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
$(document).ready(function(){



/* NAVIGATION */

    /* Function to:
     * -slide navigation into window
     * -slide content  to the right
     */
    $("#hamburgerButton").click(function( event ){
        event.preventDefault();

        $(".hamburgerThird").toggleClass("hamburgerThirdActive");

        if( $("#sideBar").attr('class') == "offScreen") {
            $("#sideBar").animate({
                right: '0px'
            }, { duration: 200, queue: false });
            $("#mainContent").animate({
                right: '150px'
            }, { duration: 200, queue: false });

            $("#sideBar").removeClass('offScreen');
        }
        else {
            $("#sideBar").animate({
                right: '-175px'
            }, { duration: 200, queue: false });
            $("#mainContent").animate({
                right: '0px'
            }, { duration: 200, queue: false });

            $("#sideBar").addClass('offScreen');
        }
    });

    /* Function to:
     *  - show which navigation button is selected
     *
     */
    $(".navButt a").click(function( event ){
        event.preventDefault();

        if( $(this).parent().attr("id") != "hamburgerNavButtActive" ) {
            $(this).parent().attr("id", "hamburgerNavButtActive"); //set curr nav butt as active

        }
        $(this).parent().siblings("#hamburgerNavButtActive").removeAttr("id"); //set other active nav buttons as inactive

    });

    /* Function to:
     *  - show which navigation button is selected
     */
    $(".navButtA").click( function( event ) {
        event.preventDefault();
        // $(this).parent().siblings("#navButtContainerActive").removeAttr("id");
        if( $(this).parent().attr("id") != "navButtContainerActive" ) {
            $(this).parent().attr("id", "navButtContainerActive"); //set curr nav butt as active

        }
        $(this).parent().siblings("#navButtContainerActive").removeAttr("id");
    });

    /* Function to load correct content of each main page without loading the
     * entire page.
     */
    $(".navButtA").click(function( event ){
        event.preventDefault();
        var url = this.href;
        var splitURL = url.split("/");
        var pageName = splitURL[splitURL.length - 1]

        // console.log( "curr url: " + url);
        // console.log( "curr page: " + pageName );
        history.replaceState(null, null, url);

        $("#tempCSS").attr('href','css/' + pageName + '.css')

        // $('#container').remove();
        // $('#mainContent').load(url + ' #container').hide().fadeIn('slow');

        $('#mainContent').remove();
        $('#contentWrapper').load(url + ' #mainContent').hide().fadeIn('slow');

    });


    /* Functions to show and hide what the backHomeButt does when a user hovers
     * over it
     */
    $("#backHomeButt").mouseenter(function(){
        $("#backHomeText").css("opacity", "1" );
    });
    $("#backHomeButt").mouseleave(function(){
        $("#backHomeText").css("opacity", "0" );
    });

    //  Functions to determine what contactPrompts show you
    $(document).on( "mouseenter", ".contactMePromptA", function() {
        $(this).animate({
            bottom: '3px' });

        if( $(this).attr("id") != "contactMePromptActive" )
            localStorage.setItem('contactMeString', $(this).find("h2").text() );

        $(this).find("h2").text("CONTACT ME!").css("color", "#E45C44");
    });
    $(document).on( "mouseleave", ".contactMePromptA", function() {
        $(this).animate({
            bottom: '0px' });

        if( localStorage.getItem('contactMeString') != null && $(this).attr("id") != "contactMePromptActive" )
            $(this).find("h2").text( localStorage.getItem('contactMeString') ).css("color", "#200535");
    });
    $(document).on( "click", ".contactMePromptA", function( event ) {
        event.preventDefault();

        if( $( '.contactContainer' ).is( ':empty' ) ) {
            $.get( 'contact.html').done( function( data ) {
                    $('.contactContainer').html(data).css("visibility", "visible").hide().fadeIn('slow');
                    var first = "joshricaurea";
                    var last = "gmail.com"
                    $('.contactContainer').find('h4').text(first + '@' + last)
            });
        }


        $('html, body').animate({
          scrollTop: $('.contactContainer').offset().top
        }, "slow");

    });

    $(document).on("click", "#backItUpA", function( event ) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, "slow" );
    });

    /* ABOUT */

    /* RESUME */

    /* PORTFOLIO */

    //  Function to show what porfolio box is being selected
    $(document).on( "mouseenter", ".portfolioFlexChildA", function() {
        $(this).animate({
            bottom: '3px' });
    });
    $(document).on( "mouseleave", ".portfolioFlexChildA", function() {
        $(this).animate({
            bottom: '0px' });
    });

    // Function to change the content of the page to the correct project on click
    $(document).on("click", ".portfolioFlexChildA", function( event ) {
        event.preventDefault();
        var url = this.href;

        // console.log( "curr url: " + url);
        history.replaceState(null, null, url);

        $("#tempCSS").attr('href','css/projects.css');

        $('#mainContent').remove();
        $('#contentWrapper').load(url + ' #mainContent').hide().fadeIn('slow');
    });

    /* Projects */

    //function to attach a click event to each project img and open a modal on click
    $(document).on("click", ".projectImg", function( event ) {
        event.preventDefault();

        var loadImg = $(this).attr('src');
        var loadCaption =  $(this).attr('alt');

        $("#modalImg").attr('src', loadImg);
        $("#modalCaption").text( loadCaption );

        $("#exitProjectInfo").css('display', 'none');
        $("#projectModal").css('display', 'flex');
    });

    //Function to close img modal on click
    $(document).on("click", "#projectModal", function( event ) {
        // event.preventDefault();

        $("#modalImg").attr('src', "");
        $("#modalCaption").text( "" );

        $("#exitProjectInfo").css('display', 'block');
        $("#projectModal").css('display', 'none');
    });

    //Function to close img modal  when clicking the X button
    $(document).on("click", "#exitModal", function( event ) {
        event.preventDefault();

        $("#modalImg").attr('src', "");
        $("#modalCaption").text( "" );

        $("#exitProjectInfo").css('display', 'block');
        $("#projectModal").css('display', 'none');
    });

}); /*End check for if document is ready */
