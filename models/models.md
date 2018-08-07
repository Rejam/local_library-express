## Book
- title: str
- author: Author[]
- summary: str
- ISBN: str
- genre: Genre[]
+ url: str

## BookInstance
- book: Book
- imprint: str
- status: enum
- due_back: Date
+ url: str

## Author
- first_name: str
- last_name: str
- dob: Date
- dod: Date
+ name: str
+ lifespan: str
+ url: str

## Genre
- name: str
+ url: str
