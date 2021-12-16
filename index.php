<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Database</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/ajax.js"></script>
    <link rel="stylesheet" href="styles/style.css" />
</head>
<body>
    <div id="nav"></div>
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-lg-5 pt-3 pb-5">
          <div class="col-lg-7">
            <h1 class="display-4 fw-bold lh-1 mb-3">User benefits</h1>
            <p class="col-lg-10 fs-4">
              <ul class="list">
                <li>Add favourites</li>
                <li>Make watchlists</li>
                <li>Share watchlists with others</li>
                <li>Add friends</li>
              </ul>
            </p>
          </div>
          <div class="col-md-10 mx-auto col-lg-5">
            <form method="post" action="php/createUser.php" class="p-4 p-md-5 border rounded-3 bg-light">
                <h2 class="mb-4 text-center">Create account</h1>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="username" name="username" placeholder="Username" required autocomplete="off">
                <label for="username">Username *</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" required autocomplete="off">
                <label for="password">Password *</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password-check" name="password-check" placeholder="Password" required autocomplete="off">
                <label for="password-check">Password again *</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" name="email" placeholder="E-mail" required autocomplete="off">
                <label for="email">E-Mail *</label>
              </div>
              <div class="form-floating mb-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" required>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Agree with everything *</label>
                  </div>
              </div>
              <button class="col-12 btn btn-lg btn-primary" type="submit" name="submit" id="submit" >Create account</button>
              <hr class="my-4">
              <a class="col-12 btn btn-md btn-secondary" href="search.html">Continue without user</a>
            </form>
          </div>
        </div>
      </div>
      <div id="footer"></div>
</body>
</html>