package psa.t1.v1.controllers;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Login;

@RestController()
public class LoginController {
    @PostMapping(value="/login", consumes = {"*/*"}, produces = "application/json")
    public String login(@RequestBody Login login) {
        return "OK";
    }
}
