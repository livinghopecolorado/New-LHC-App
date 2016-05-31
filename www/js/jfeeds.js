function getFeeds(opt) {

    var def = {
        FeedUrl: (typeof opt.FeedUrl !== 'undefined') ? opt.FeedUrl : "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?",
        MaxCount: (typeof opt.MaxCount !== 'undefined') ? opt.MaxCount : 5,
        DateFormat: (typeof opt.DateFormat !== 'undefined') ? opt.DateFormat : "dddd, YYYY-MM-DD HH:mm",
        DateFormatLang: (typeof opt.DateFormatLang !== 'undefined') ? opt.DateFormatLang : "en"
    }

    var feeds = $.ajax({
        async: true,
        url: def.FeedUrl,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (def.MaxCount < data.articles.length) {
              data.articles.length=def.MaxCount;
              data.total=def.MaxCount;
            }
            $.each( data.articles, function( index, item ) {
              console.log(data.articles[index].content);
              console.log(typeof data.articles[index].content);
              if (typeof data.articles[index].content !== 'undefined') {
                $('a[href^="http://"]', data.articles[index].content).attr('target','_system');
                data.articles[index].content = item.content.replace('<![CDATA[', '');
                data.articles[index].content = item.content.replace(']]>', '');
              }
              if (typeof data.articles[index].published_date !== 'undefined') {
                var dt= new Date(data.articles[index].published_date);
                if ($.trim(def.DateFormat).length > 0) {
                  try {
                      moment.lang(def.DateFormatLang);
                      data.articles[index].published_date = moment(dt).format(def.DateFormat);
                  }
                  catch (e){data.articles[index].published_date = dt.toLocaleDateString();}
                } else {
                  data.articles[index].published_date = dt.toLocaleDateString();
                }
              }
            });
        }
    });

    return feeds;
}