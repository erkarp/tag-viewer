package controllers;

import play.*;
import play.mvc.*;
import play.data.validation.*;

import java.util.*;
import java.io.*;


import models.*;


public class Application extends Controller {

    public static void index() {
        render();
    }
    public static String html;

    public static void bar()
    {
        render("/path/to/template.html");
    }

    public static void graph(@Required String link) throws Exception {
        if(validation.hasErrors()) {
            flash.error("Oops, please enter a url!");
            index();
        }

        List<String> html = User.crawl( link );
        String join = User.joinHTML( html );
        String tags = User.tagCount( join );

        render(html, link, tags);
    }

}
