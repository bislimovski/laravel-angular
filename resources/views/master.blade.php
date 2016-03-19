<!DOCTYPE html>
<html ng-app="mainApp">
<head>
    <title>Gallery application in Angular JS</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/dropzone/dist/dropzone.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-bootstrap/ui-bootstrap-csp.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/angular-loading-bar/build/loading-bar.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

    <script>
        var baseUrl="{{url('/')}}/";
        //var csrfToken="{{csrf_token()}}";
    </script>
</head>
<body>
    <div class="container" ng-controller="globalController">
        <!--You must declare ng-view in order the routes to take effect -->
        <div ng-view></div>
    </div>
    <script type="text/javascript" src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/dropzone/dist/dropzone.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-bootstrap/ui-bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('bower_components/angular-loading-bar/build/loading-bar.min.js')}}"></script>

    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/models.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>

</body>
</html>