package models;

import java.util.*;
import java.net.*;
import java.io.*;
import javax.persistence.*;

import play.db.jpa.*;

@Entity
public class User extends Model {

    private static String toString(HashMap<String, Integer> map) {
        String str = "{ ";

        for (Map.Entry<String, String> tag : map.entrySet()) {
            str += tag.getKey() + ": " + tag.getValue() + ", ";
        }

        return str + " }";
    }


    public static List<String> crawl(String link) throws Exception {

        URL oracle = new URL(link);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(oracle.openStream()));


        List<String> collection = new ArrayList<String>();
        String inputLine;


        while ((inputLine = in.readLine()) != null) {
            collection.add(inputLine);
        }
        in.close();

        return collection;
    }

    public static String joinHTML(List<String> html) {

        String joined = "";
        String str = "";

        for (int i=0; i<html.size(); i++) {

            str = html.get(i);
            if (str.trim().length() > 0) {
                joined += str + '\n';
            }
            System.out.println("i " + i);
        }

        return joined;
    }

    public static String tagCount(String html) {
        HashMap<String, Integer> count = new HashMap();
        String tag;
        int start = 0;
        int jump = 0;
        int x = 0;

        while (  html.indexOf("</") != html.lastIndexOf("</")  ) {

            start = html.indexOf('<') + 1;

            if (html.charAt(start) != '/') {

                jump = tagEndIndex(html, start);
                tag = html.substring(start, jump);
                html = html.substring(jump);


                if (count.get(tag) != null) {

                    x = count.get(tag);
                    count.put(tag, x+1);

                } else
                    count.put(tag, 1);

            } else
                html = html.substring(start);

            System.out.println(html.indexOf("</") + " ~~ " + html.lastIndexOf("</"));

        }

        System.out.println(toString(count));
        return toString(count);
    }

    public static int tagEndIndex(String html, int start) {

        int index = start;
        int count = start + 1;

        while (index == start) {
            if (html.charAt(count) == ' ' ||
                html.charAt(count) == '>' ||
                html.charAt(count) == '/' )

                index = count;
            else
                count++;
        }

        return index;
    }


}
