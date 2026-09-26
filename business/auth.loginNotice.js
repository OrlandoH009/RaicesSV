const LOGIN_NOTICE_COOKIE = 'sr_login_notice';

const setLoginNotice = (req, res, name) => {
    const safeName = typeof name === 'string' ? name.trim().slice(0, 60) : '';
    res.cookie(LOGIN_NOTICE_COOKIE, safeName || '1', {
        maxAge: 60 * 1000,
        httpOnly: false,
        sameSite: 'lax',
        secure: req.secure,
        path: '/'
    });
};

module.exports = { setLoginNotice };
