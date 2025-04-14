const express=require('express');
const path = require('path');
const multer=require('multer');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}--${file.fieldname}`);
    }
  })
  
const upload = multer({ storage: storage })
let imageArray=[];
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload',upload.single('fileName'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    imageArray=[...imageArray,req.file.path];
    res.redirect('/');
})
app.get('/', (req, res) => {
    res.render('Home', {
        imgArray: imageArray 
    });
});

app.listen(3000,()=>{
    console.log(`Server running on http://localhost:3000`);
});