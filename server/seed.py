from app import app, db
from models.models import *
from random import choice as rc
from faker import Faker
 
fake = Faker()

with app.app_context():
    print("Starting seed...")
    db.session.query(snippets_tags).delete()
    Snippet.query.delete()
    User.query.delete()
    Tag.query.delete()

    seed_data = [
    # Python snippets
    {"tag": "python", "text_content": "# Print 'Hello, World!'\nprint('Hello, World!')"},
    {"tag": "python", "text_content": "# Define a function\n\ndef add(a, b):\n    return a + b"},
    {"tag": "python", "text_content": "# List comprehension\nsquared_numbers = [x**2 for x in range(10)]"},
    {"tag": "python", "text_content": "# Dictionary comprehension\ndict_comp = {x: x**2 for x in (2, 4, 6)}"},
    {"tag": "python", "text_content": "# Lambda function\nmultiply = lambda x, y: x * y"},

    # C++ snippets
    {"tag": "c++", "text_content": "// Print 'Hello, World!'\n#include<iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}"},
    {"tag": "c++", "text_content": "// Basic for loop\nfor(int i = 0; i < 10; i++) {\n    std::cout << i << std::endl;\n}"},
    {"tag": "c++", "text_content": "// Function definition\nint add(int a, int b) {\n    return a + b;\n}"},
    {"tag": "c++", "text_content": "// Vector usage\n#include<vector>\n\nstd::vector<int> vec = {1, 2, 3, 4, 5};"},
    {"tag": "c++", "text_content": "// String concatenation\nstd::string hello = \"Hello\";\nstd::string world = \"World\";\nstd::string helloWorld = hello + \" \" + world;"},

    # Java snippets
    {"tag": "java", "text_content": "// Print 'Hello, World!'\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"},
    {"tag": "java", "text_content": "// Define a function\npublic int add(int a, int b) {\n    return a + b;\n}"},
    {"tag": "java", "text_content": "// Basic for loop\nfor(int i = 0; i < 10; i++) {\n    System.out.println(i);\n}"},
    {"tag": "java", "text_content": "// ArrayList usage\nimport java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<String>();"},
    {"tag": "java", "text_content": "// String concatenation\nString hello = \"Hello\";\nString world = \"World\";\nString helloWorld = hello + \" \" + world;"},

    # JavaScript snippets
    {"tag": "javascript", "text_content": "// Print 'Hello, World!'\nconsole.log('Hello, World!');"},
    {"tag": "javascript", "text_content": "// Basic for loop\nfor(let i = 0; i < 10; i++) {\n    console.log(i);\n}"},
    {"tag": "javascript", "text_content": "// Define a function\nfunction add(a, b) {\n    return a + b;\n}"},
    {"tag": "javascript", "text_content": "// Array usage\nlet arr = [1, 2, 3, 4, 5];"},
    {"tag": "javascript", "text_content": "// String concatenation\nlet hello = 'Hello';\nlet world = 'World';\nlet helloWorld = hello + ' ' + world;"}
]
    
    users = []
    for _ in range(10):
        users.append(User(email=fake.email()))
    db.session.add_all(users)

    tag_names = set([s.get('tag') for s in seed_data])
    for tag in tag_names:
        t = Tag(name=tag)
        db.session.add(t)
        curr_snippets = filter(lambda x: x.get('tag') == tag, seed_data)

        for snippet in curr_snippets:
            s = Snippet(text_content=snippet.get('text_content'))
            s.user = rc(users)
            s.tags.append(t)
            db.session.add(s)

    db.session.commit()
    print("Finished seed!")