const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    
    const authHeader = req.cookies.accessToken;
    if (authHeader) {
        const token = authHeader;
        console.log(token);
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json('Đăng nhập thất bại!');
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        return res.status(401).json('Bạn chưa đăng nhập!');
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.cookies.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Đăng nhập để thực hiện hành động trên!');
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Hành động đang thực hiện cần quyền quản trị!');
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
