$(function(){
	
	var $body = $(document.body),
      	$html = $(document.documentElement);

    function formPopup($btn,$wrap){

    var closeForm = $('.formExtraWrapper .close-form'),
            formWrap = $($wrap),
            formBtn = $($btn),
            formOpened = 'opened',
            overflowHidden = 'oveflowHidden';

        closeForm.on('click', function() {
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });
        formBtn.on('click', function(event) {
            formWrap.addClass(formOpened);
            $html.toggleClass(overflowHidden);
            event.preventDefault();
        });

        $html.on('keyup', function(event) {
            if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
        $body.on('click touchstart', function(a) {
            if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
            if (formWrap.hasClass(formOpened)) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
    }

	formPopup('.form_btn','.form_popup');

    var menuBtn = $('.burger'),
        menuWrapper = $('.menu_burger'),
        menuClose = $('.menuClose'),        
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
        $html.toggleClass(overflowHidden);
        $html.toggleClass('open_menu');
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
        $html.removeClass(overflowHidden);
        $html.removeClass('open_menu');
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length) 
          return;
        if (menuBtn.hasClass(openedMenu)){
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
            $html.removeClass('open_menu');
        }
    });

    
});


document.addEventListener('DOMContentLoaded', function() {
    function tabsBlock() {
        const tabBlocks = document.querySelectorAll('.tabs_table');
        const tabActive = 'active';
        
        if(!tabBlocks.length) return;

        tabBlocks.forEach(function(tabBlock) {
            const tabTitles = tabBlock.querySelectorAll('.tabs_title .tabs_title_item');
            const tabBodies = tabBlock.querySelectorAll('.tabs_center .tabs_center_body');

            tabTitles.forEach(function(tabTitle, index) {
                tabTitle.addEventListener('click', function(e) {
                    e.preventDefault();
                    tabTitles.forEach(function(t) { t.classList.remove(tabActive); });
                    tabTitle.classList.add(tabActive);

                    tabBodies.forEach(function(b) { b.classList.remove(tabActive); });
                    tabBodies[index].classList.add(tabActive);
                });
            });

            function moveContentForSmallScreens() {
                if (window.innerWidth <= 980) {
                    tabTitles.forEach(function(tabTitle, index) {
                        const tabBody = tabBodies[index];
                        if (!tabTitle.querySelector('.tabs_center_body')) {
                            tabTitle.appendChild(tabBody);
                        }
                    });
                } else {
                    const rightContainer = tabBlock.querySelector('.tabs_center');
                    tabBodies.forEach(function(tabBody) {
                        if (rightContainer && !rightContainer.contains(tabBody)) {
                            rightContainer.appendChild(tabBody);
                        }
                    });
                }
            }

            window.addEventListener('resize', moveContentForSmallScreens);
            moveContentForSmallScreens();
        });
    }

    tabsBlock();


    const getCellValue = (tr, idx) => tr.children[idx].getAttribute('data-heatmap-value') || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) => (
        (v1, v2) => 
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) 
            ? v1 - v2 
            : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    document.querySelectorAll('.table_black th').forEach(th => th.addEventListener('click', () => {
        const table = th.closest('table');
        const tbody = table.querySelector('tbody');
        Array.from(tbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => tbody.appendChild(tr));
    }));
});


