const passport = require('../passport');
const fs = require('fs');
const csv = require('csv-parser')
const clc = require("cli-color");
const XLSX = require('xlsx');
const sharp = require('sharp');
const moment = require("moment");
module.exports = function (app) {
    const {db} = app.locals;

    async function initAdmin() {
        //await db.user.deleteMany().then(console.log)
        if (!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW)) {
            return console.log('WARN:', clc.red('NO process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW specified'));
        }
        const abrikos = await db.user.findOne({email: process.env.ADMIN_EMAIL})
        if (!abrikos) {
            db.user.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSW,
                isAdmin: true
            })
        } else {
            abrikos.isAdmin = true;
            abrikos.save()
        }
    }

    initAdmin()


    app.get('/api/admin/users', passport.isAdmin, async (req, res) => {
        const users = await db.user.find().sort({logged: -1})
        res.send(users)
    })

    app.get('/api/admin/user/:id/block', passport.isAdmin, async (req, res) => {
        const user = await db.user.findById(req.params.id)
        user.blocked = !user.blocked
        await user.save()
        res.sendStatus(200)
    })

    app.get('/api/admin/user/:id/delete', passport.isAdmin, async (req, res) => {
        const user = await db.user.findById(req.params.id)
        await user.delete()
        res.sendStatus(200)
    })

    app.post('/api/admin/switch-role', passport.isAdmin, async (req, res) => {
        try {
            const user = await db.user.findById(req.body.id)
            const admins = await db.user.find({isAdmin: true})
            if (admins.length <= 2 && user.isAdmin) throw {error: 406, message: 'Невозможно снять привилегии т.к. количество оставшихся админов 2'}
            user.isAdmin = !user.isAdmin
            await user.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

}
