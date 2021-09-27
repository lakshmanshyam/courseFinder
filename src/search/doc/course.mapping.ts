export const mappings = {
    "properties" : {
        "country" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
            }
        }
        },
        "course_id" : {
        "type" : "text",
        "fielddata": true,
        "fields" : {
            "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
            }
        }
        },
        "minGpa" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
            }
        }
        },
        "minGre" : {
        "type" : "long"
        },
        "name" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
            }
        }
        }
    }
};
  