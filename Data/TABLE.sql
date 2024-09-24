CREATE TABLE Profiles (
  rollno INT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwords VARCHAR(255) NOT NULL,
  years INT NOT NULL,
  sem INT NOT NULL,
  dept_name VARCHAR(255) NOT NULL,
  courses JSON
);

CREATE TABLE Courses (
course_id VARCHAR(255) PRIMARY KEY,
courses VARCHAR(255) NOT NULL,
dept_name VARCHAR(255) NOT NULL,
years INT NOT NULL,
sem INT NOT NULL
);

CREATE TABLE Videos (
video_id INT AUTO_INCREMENT PRIMARY KEY,
course_id VARCHAR(255) NOT NULL,
rollno INT NOT NULL,
video_name VARCHAR(255) NOT NULL,
video_link VARCHAR(255) NOT NULL,
attachments VARCHAR(255),
descriptions VARCHAR(255),
views INT DEFAULT 0,
likes INT DEFAULT 0,
FOREIGN KEY (course_id) 
    REFERENCES Courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (rollno)
    REFERENCES Profiles(rollno)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE WatchLater (
id INT AUTO_INCREMENT PRIMARY KEY,
rollno INT NOT NULL,
video_id INT NOT NULL,
FOREIGN KEY (video_id) 
    REFERENCES Videos(video_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (rollno)
    REFERENCES Profiles(rollno)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Feedback (
id INT AUTO_INCREMENT PRIMARY KEY,
rollno INT NOT NULL,
video_id INT NOT NULL,
feedback VARCHAR(255),
FOREIGN KEY (video_id) 
    REFERENCES Videos(video_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
FOREIGN KEY (rollno)
    REFERENCES Profiles(rollno)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO feedback (rollno,video_id,feedback) VALUES (roll,id,feed);

RETURN (SELECT likes FROM videos WHERE video_id=id) + 1;

RETURN (SELECT likes FROM videos WHERE video_id=id) - 1;

RETURN (SELECT views FROM videos WHERE video_id=id) + 1;

INSERT INTO watchlater (rollno,video_id) VALUES (roll,id);