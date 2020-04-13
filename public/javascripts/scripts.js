$(function () {
  //remove errors
  function removeErrors() {
    $("form.login p.error,form.register p.error").remove();
    $("form.login input, form.register input").removeClass("error");
  }
  //togle
  var flag = true;
  $(".switch-button").on("click", function (e) {
    e.preventDefault();

    $("input").val("");
    removeErrors();

    if (flag) {
      flag = false;
      $(".register").show("slow");
      $(".login").hide();
    } else {
      flag = true;
      $(".login").show("slow");
      $(".register").hide();
    }
  });

  //clear
  $("form.login input, form.register input").on("focus", function () {
    removeErrors();
  });

  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    removeErrors();

    var data = {
      login: $("#register-login").val(),
      password: $("#register-password").val(),
      passwordConfirm: $("#register-password-confirm").val(),
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/api/auth/register",
    }).done(function (data) {
      if (!data.ok) {
        $(".register h2").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function (item) {
            $("input[name=" + item + "]").addClass("error");
          });
        }
      } else {
        $(location).attr("href", "/");
      }
    });
  });

  $(".login-button").on("click", function (e) {
    e.preventDefault();
    removeErrors();

    var data = {
      login: $("#login-login").val(),
      password: $("#login-password").val(),
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/api/auth/login",
    }).done(function (data) {
      if (!data.ok) {
        $(".login h2").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function (item) {
            $("input[name=" + item + "]").addClass("error");
          });
        }
      } else {
        $(location).attr("href", "/");
      }
    });
  });
});

/*eslint-disable no-undef */
$(function () {
  //eslint-disable-next-linne
  var editor = new MediumEditor("#post-body", {
    placeholder: {
      text: "",
      hideOnClick: true,
    },
  });

  //remove errors
  function removeErrors() {
    $("form.post-form p.error").remove();
    $("form.post-form input, form.post-form div").removeClass("error");
  }

  //clear
  $("form.post-form input, form.post-form div").on("focus", function () {
    removeErrors();
  });

  //pusblish
  $(".publish-button").on("click", function (e) {
    e.preventDefault();

    var data = {
      title: $("#post-title").val(),
      body: $("#post-body").html(),
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/post/add",
    }).done(function (data) {
      if (!data.ok) {
        $(".post-form h2").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function (item) {
            $("#post-" + item).addClass("error");
          });
          console.log(data);
        }
      } else {
        $(location).attr("href", "/");
      }
    });
  });
});
/*eslint-enable no-undef */
