var $main = $('#pt-main'),
    $pages = $main.children('div.pt-page'),
    $current = $pages.eq(0);

    $current.addClass('pt-page-current');

    function gotoPage(pagenumber) {
      newPageId = 'page' + pagenumber;
      currentPageId = $current.attr('id');

      if(currentPageId == newPageId) {
        return true;
      }

      $newPage = $('#pt-main').find('#' + newPageId);
      $current.removeClass('pt-page-current');
      $newPage.addClass('pt-page-current');
      $current.css('display', 'none');
      window.scrollTo(0, 0);
      $newPage.css('display', 'block');
      $current = $newPage;
    }
