$(".save-btn").on("click", function () {

    console.log("clicked")

    var id = $(this).attr("data-id");
    console.log(id)
    $.ajax({
        url: "/saveArticle/" + id,
        method: "POST",
        data: {
            id: id
        }
    }).then(function () {
        location.reload();
    })
})

$(".remove-btn").on("click", function () {

    console.log("clicked")

    var id = $(this).attr("data-id");
    console.log(id)
    $.ajax({
        url: "/removeArticle/" + id,
        method: "POST",
        data: {
            id: id
        }
    }).then(function () {
        location.reload();
    })
})

$(".save-comment").on("click", function () {

    console.log("clicked")

    var id = $(this).attr("data-id");
    console.log(id)
    var body = $("#new-comment-" + id).val().trim();
    console.log(body)
    $.ajax({
        url: "/newComment/" + id,
        method: "POST",
        data: {
            id: id,
            body: body
        }
    }).then(function () {
        location.reload();
    })
});

$(".thing").on("click", function () {

    console.log("clicked")

    var id = $(this).attr("data-id");
    console.log(id)
    $.ajax({
        url: "/removeNote/" + id,
        method: "GET",
        data: {
            _id: id
        }
    }).then(function () {
        location.reload();
    })
})

$(".comment-btn").on("click", function () {
    var id = $(this).attr("data-id");

    if ($("#comments-" + id).hasClass("d-none") === true) {
        $("#comments-" + id).removeClass("d-none")
    } else {
        $("#comments-" + id).addClass("d-none")

    }
});
