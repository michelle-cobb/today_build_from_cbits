var guideMaker = {};
guideMaker.content = appContent;

guideMaker.config = {};
guideMaker.config.mode = "demo"; //demo or normal or assessment

guideMaker.config.mainContent = {};
guideMaker.config.mainContent.showTitle = true; 

guideMaker.images_url = "images/";
guideMaker.videos_url = "videos/";

guideMaker.status = {};
guideMaker.status.currentPageIndex = null;
guideMaker.status.currentChapterId = null;
guideMaker.status.currentChapterElement = null;
guideMaker.status.currentChapterContents = null;
guideMaker.status.numPagesInCurrentChapter = null;


guideMaker.start = function (appContent) {

    if (guideMaker.config.mode == "demo") {
        guideMaker.status.currentChapterId = 681;
    }

    guideMaker.build.navChapterBar(guideMaker.arrayOfChapterIds(guideMaker.content));
    guideMaker.build.chapter(guideMaker.status.currentChapterId, guideMaker.content);

}





guideMaker.arrayOfChapterIds = function (appContent) {

    var search_criteria = {
        element_type: "lesson"
    };
    return _.where(appContent, search_criteria);
};

guideMaker.getChapterContents = function (chapter_id, appContent) {
    var search_criteria = {
        id: chapter_id
    },
        chapter_contents_list = _.where(appContent, search_criteria)[0].element_list.split(","),
        chapter_contents = [];

    // console.log("Chapter selected:",_.where(appContent, search_criteria)[0]);
    // console.log("Chapter contents list:",chapter_contents_list);

    _.each(chapter_contents_list, function (element) {
        // console.log(parseInt(element));
        chapter_contents.push(_.where(appContent, {
            id: parseInt(element)
        })[0]);
    });
    return chapter_contents;
};





guideMaker.build = {}
guideMaker.build.navChapterBar = function (arrayOfChapters) {

    _.each(arrayOfChapters, function (i) {

        $("#main_nav").append('<li class="load-chapter" data-id="' + i.id + '"><a href="#' + i.pretty_name + '">' + i.pretty_name + '</a></li>');

    });

    $(".load-chapter").on("click", function(ev){guideMaker.actions.goToChapter(ev.currentTarget.dataset.id,guideMaker.contents)})
};




guideMaker.build.chapter = function (currentChapterId, appContents) {

	$("button.pageNext").off("click");
    $("button.pageBack").off("click");

    console.log("Building Chapter", currentChapterId);
    guideMaker.status.currentChapterElement = _.where(guideMaker.content, {
        id: currentChapterId
    })[0];
    guideMaker.status.currentChapterContents = guideMaker.getChapterContents(currentChapterId, appContents);
    guideMaker.status.numPagesInCurrentChapter = guideMaker.status.currentChapterContents.length;
    guideMaker.status.currentPageIndex = 0;
    guideMaker.actions.setPage(guideMaker.status.currentChapterContents[guideMaker.status.currentPageIndex]);
    $("li.load-chapter").removeClass("active");
	$("li.load-chapter[data-id=\""+currentChapterId+"\"]").addClass("active");
	$(".pageBack").hide();

    $(".currentSlideCount").html("1 of " + guideMaker.status.numPagesInCurrentChapter);


    $(".pageNext").html('NEXT <i class= "icon-chevron-right"></i>');
    $(".pageBack").html('<i class="icon-chevron-left"></i> BACK');

    $("button.pageNext").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex+1)});
    $("button.pageBack").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex-1)});
    guideMaker.build.chapterProgressBar(guideMaker.status.currentPageIndex+1,guideMaker.status.numPagesInCurrentChapter);

    $(".mainContainer, .pageNext, .chapterProgress, .currentSlideCount").show();

};

guideMaker.build.chapterProgressBar = function (position,total){
	    $(".chapterProgressBar").width((position/total)*100 + "%");
}

guideMaker.actions = {};

guideMaker.actions.setPage = function (pageContents) {

    mainContentsTemplate = function (headline, contents) {

        var main_contents = "";
        if (guideMaker.config.mainContent.showTitle == true){
            main_contents = main_contents + "<h1>" + headline + "</h1>";
        }

        main_contents = main_contents+ contents;
        return main_contents;
    }

    $(".mainContent").html(mainContentsTemplate(pageContents.pretty_name, pageContents.main_content));
    $(".topRight").html(pageContents.side_panel_content2);
    $(".bottomRight").html(pageContents.side_panel_content);

    // $(".tooltip").tooltip();
    $("a.image").on("click",function(ev){ev.preventDefault();console.log(ev);guideMaker.actions.loadImage(ev.currentTarget.href);});
    $("a.graph").on("click",function(ev){ev.preventDefault();console.log(ev);guideMaker.actions.loadGraph(ev.currentTarget.href)});
    $("a.video").on("click",function(ev){ev.preventDefault();console.log(ev);guideMaker.actions.loadVideo(ev.currentTarget.href);});

};

guideMaker.actions.changePage = function (index_of_page) {
    console.log("Page changed to ", index_of_page + 1, "of", guideMaker.status.numPagesInCurrentChapter);

    $(".currentSlideCount").html(index_of_page + 1 + " of " + guideMaker.status.numPagesInCurrentChapter);

    guideMaker.status.currentPageIndex = index_of_page;
    if (index_of_page == 0) {
    	$("button.pageNext").off("click");
    	$("button.pageBack").off("click");
    	$("button.pageNext").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex+1)});
    	$("button.pageBack").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex-1)});
    	$(".pageBack").hide();
    } 

    if (index_of_page == guideMaker.status.numPagesInCurrentChapter - 1) {
    	$(".pageNext").html('FINISH <i class= "icon-stop"></i>');

    	$("button.pageNext").off("click");
    	$("button.pageBack").off("click");
    	$("button.pageNext").on("click",function(ev){guideMaker.actions.loadAssessment();});
    	$("button.pageBack").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex-1)});

    } 
    
    if (index_of_page != 0 && index_of_page != guideMaker.status.numPagesInCurrentChapter - 1){
    	$(".pageNext").html('NEXT <i class= "icon-chevron-right"></i>');
    	$(".pageBack").html('<i class="icon-chevron-left"></i> BACK');
    	$("button.pageNext").off("click");
    	$("button.pageBack").off("click");
    	$("button.pageNext").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex+1)});
    	$("button.pageBack").on("click",function(ev){guideMaker.actions.changePage(guideMaker.status.currentPageIndex-1)});
    	$(".pageBack").show();
    }

    guideMaker.build.chapterProgressBar(guideMaker.status.currentPageIndex+1,guideMaker.status.numPagesInCurrentChapter);
    guideMaker.actions.setPage(guideMaker.status.currentChapterContents[guideMaker.status.currentPageIndex]);

};


guideMaker.actions.goToChapter = function(chapterId,appContents){

    if (confirm('Are you sure you want to quit this chapter?')) {
    guideMaker.build.chapter(parseInt(chapterId),guideMaker.content);
} else {
    // Do nothing!
}
    

}


guideMaker.actions.loadAssessment = function (id_of_questionnaire) {
    alert("Assessments have not yet been provided, please check in later!");
};

guideMaker.actions.loadImage = function(image){

var imageTemplate = function (image_location){
    return '<img src="'+guideMaker.images_url +image_location +'"/>'}
    $(".topRight").html(imageTemplate(image.replace("http://","").replace("/","")));


}

guideMaker.actions.loadVideo = function(video){

var videoTemplate = function (mp4_location){
    return '<video style=\"width:100%;\" controls autoplay><source src="'+guideMaker.videos_url +mp4_location +'" type="video/mp4">Your browser does not support the video tag.</video>'}
    $(".topRight").html(videoTemplate(video.replace("http://","").replace("/","")));
}


//proxy until highcharts discussion
guideMaker.actions.loadGraph = function(image){

var imageTemplate = function (image_location){
    return '<img src="'+guideMaker.images_url +image_location +'"/>'
}

    $(".topRight").html(imageTemplate(image.replace("http://","").replace("/","")));


}


guideMaker.actions.loadId = function(id_to_load, appContents){

return _.where(appContents, {id:id_to_load}).main_content;

}
