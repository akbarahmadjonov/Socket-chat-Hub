const fs = require("fs").promises;
const path = require("path");

exports.reJoin = async (req, res) => {
  try {
    //* Username comes from the input that users enter in the page
    const { username } = req.body;

    const filePath = path.join(__dirname, "../db/users.json");
    const fileContent = await fs.readFile(filePath, "utf-8");

    //* Parses json object into a Javascript object
    const users = JSON.parse(fileContent, null, 2);

    //* Finds users from the users.json
    const findUser = await users.find((user) => user.username === username);
    //* Checks if the user is in database it returns (userAlreadyExists.ejs) page
    if (!findUser) {
      return res.render("userAlreadyExists");
    }
    res.render("index");
  } catch (error) {
    console.log(error);
    //* Returns the eror message
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.join = async (req, res) => {
  try {
    //* Username comes from the input that users enter in the page
    const { username } = req.body;

    const filePath = path.join(__dirname, "../db/users.json");
    const fileContent = await fs.readFile(filePath, "utf8");

    let users = [];

    if (fileContent) {
      //* Parses json object into a Javascript object
      users = JSON.parse(fileContent);
    }

    //* Finds users from the users database
    const findUser = users.find((user) => user.username === username);
    if (findUser) {
      return res.render("rejoin");
    }

    //* Generates the new username
    const newUser = { username };

    //* Adds a new user to the list of users (database)
    users.push(newUser);

    //* Writes the updated users array back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    res.render("index");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
