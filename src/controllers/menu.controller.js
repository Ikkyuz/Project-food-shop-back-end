const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); 
    }
});
  
const upload = multer({ storage: storage });

exports.getAllMenus = async (req, res) => {
    const menus = await prisma.menu.findMany({
        include: {
          category: true,
        },
    });
  
    const menusWithUrls = menus.map(menu => ({
        ...menu,
        pictureUrl: menu.picture ? `${req.protocol}://${req.get("host")}/images/${menu.picture}` : null,
    }));

    res.json(menusWithUrls);
}

exports.getMenuById = async (req, res) => {
    const { id } = req.params;
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { category: true },
    });

    if (menu) {
      menu.pictureUrl = menu.picture ? `${req.protocol}://${req.get("host")}/images/${menu.picture}` : null;
    }
    res.json(menu);
}

exports.createMenu = async (req, res) => {
    upload.single("picture")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        console.log("📁 ไฟล์ที่อัปโหลด:", req.file);
    
        const { categoryId, name, price, description } = req.body;
        const picture = req.file ? req.file.filename : null;
    
        try {
          const menu = await prisma.menu.create({
            data: {
              categoryId,
              name,
              price: parseInt(price), 
              description,
              picture,
            },
          });
    
          res.json(menu);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    });
};

exports.updateMenu = async (req, res) => {
    upload.single("picture")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
    
        const { id } = req.params;
        const { categoryId, name, price, description } = req.body;
        const picture = req.file ? req.file.filename : null;
    
        try {
          const menu = await prisma.menu.update({
            where: { id },
            data: {
              categoryId,
              name,
              price: parseInt(price), 
              description,
              picture,
            },
          });
    
          res.json(menu);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    });
}

exports.deleteMenu = async (req, res) => {
    const { id } = req.params;
    const deletedMenu = await prisma.menu.delete({
        where: { id: id }
    });
    res.status(204).send(deletedMenu);
}