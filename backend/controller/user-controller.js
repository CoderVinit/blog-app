import User from "../model/User.js";
import bcrypt from 'bcryptjs';


export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();

    } catch (error) {
        console.log(err)
    }

    if (!users) {
        return res.status(404).json({ massage: "No user Available" });
    }
    else {
        return res.status(200).json({ users });
    }
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ massage: "User already exists" })
    }
    else {
        const hashedpassword = bcrypt.hashSync(password);
        const user = new User({ name, email, password: hashedpassword, blogs: [] });


        try {
            await user.save();
        } catch (error) {
            console.log(error);
        }
        return res.status(201).json({ user });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ massage: "Couldn't find user by this email, please signup" })
    }

    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

    if (!isCorrectPassword) {
        return res.status(400).json({ massage: "Invalid Password" })
    }
    else {
        return res.status(200).json({ massage: "LoggedIn Successfully", user: existingUser });
    }

} 