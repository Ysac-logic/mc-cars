$(document).ready(function () {
    const $mobileBtn = $('#mobile_btn');
    const $mobileMenu = $('#mobile_menu');
    const $navItems = $('.nav-item');
    const $sections = $('section');

    // ABRIR/FECHAR MENU MOBILE
    $mobileBtn.on('click', function () {
        $mobileMenu.toggleClass('active');
        $(this).find('i').toggleClass('fa-x');

        // Alternar exibição do menu
        if ($mobileMenu.hasClass('active')) {
            $mobileMenu.show();
        } else {
            $mobileMenu.hide();
        }
    });

    // FECHAR MENU AO CLICAR EM UM LINK
    $('#mobile_nav_list a').on('click', function () {
        $mobileMenu.removeClass('active').hide();
        $mobileBtn.find('i').removeClass('fa-x');
    });

    // SCROLL - ATUALIZAR NAV ATIVO
    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        let activeSectionIndex = 0;

        $sections.each(function (i) {
            const sectionTop = $(this).offset().top - 200;
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        $navItems.removeClass('active');
        $($navItems[activeSectionIndex]).addClass('active');
    });

    // SCROLLREVEAL
    ScrollReveal().reveal('#cta, .dish, #testimonial_chef, .feedback', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });
});
