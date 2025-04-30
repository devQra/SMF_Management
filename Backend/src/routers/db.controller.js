const MongoClient = require('mongodb').MongoClient;
const Client = new MongoClient('mongodb://localhost:27017');
const db = Client.db('SMT_IT');

// 스마트팩토리 관리자 시스템
const Admin = db.collection('Admin');
const Product = db.collection('Product');
const Progress = db.collection('Progress');
const Target = db.collection('Target');
const Total = db.collection('Total');

// 스마트팩토리 유저 페이지
const User = db.collection('User');
const Board = db.collection('UserBoard');

// 스마트축사
const User2 = db.collection('User2');
const Weight = db.collection('Weight');

Client.connect((err, db) => {
  console.log('Connected to MongoDB');
});

exports.registerAdmin = async (ctx) => {
  const { key, id, pw } = ctx.request.body;

  if (await Admin.findOne({ key: key, id: id }))
    ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await Admin.insertOne({ key: key, id: id, pw: pw });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.registerUser = async (ctx) => {
  const { userName, userEmail, userPhone, userAddress, userPasswd, userType } = ctx.request.body;

  if (await User.findOne({ userEmail }))
    ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await User.insertOne({ userName, userEmail, userPhone, userAddress, userPasswd, userType });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.registerUser2 = async (ctx) => {
  const { id, name, pw } = ctx.request.body;

  if (await User2.findOne({ id })) ctx.body = { registerSuccess: false, message: '회원가입 실패' };
  else {
    await User2.insertOne({ id, name, pw });
    ctx.body = { registerSuccess: true, message: '회원가입 성공' };
  }
};

exports.loginAdmin = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await Admin.findOne({ id: id, pw: pw })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else ctx.body = { loginSuccess: true, message: '로그인 성공' };
};

exports.loginUser = async (ctx) => {
  let { userEmail, userPasswd } = ctx.request.body;

  if (!(await User.findOne({ userEmail, userPasswd })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else {
    let { userName, userPhone, userAddress, userType } = await User.findOne({
      userEmail,
      userPasswd,
    });
    ctx.body = { userName, userEmail, userPhone, userAddress, userType };
  }
};

exports.loginUser2 = async (ctx) => {
  const { id, pw } = ctx.request.body;

  if (!(await User2.findOne({ id: id, pw: pw })))
    ctx.body = { loginSuccess: false, message: '로그인 실패' };
  else ctx.body = { loginSuccess: true, message: '로그인 성공' };
};

exports.findProduct = async (ctx) => {
  ctx.body = await Product.find().toArray();
  console.log(ctx.body);
};

exports.findProgress = async (ctx) => {
  ctx.body = await Progress.find().toArray();
  console.log(ctx.body);
};

exports.findTarget = async (ctx) => {
  ctx.body = await Target.find().toArray();
  console.log(ctx.body);
};

exports.findTotal = async (ctx) => {
  ctx.body = await Total.find().toArray();
  console.log(ctx.body);
};

exports.insertProduct = async (msg) => {
  const { name, num, item, is_defect, prod_date } = msg;

  await Product.insertOne({ name, num, item, is_defect, prod_date });
  await Progress.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Target.updateOne({ name: name }, { $inc: { prod_vol: 1 } });
  await Total.updateOne({ name: name }, { $inc: { prod_vol: 1 } });

  if (is_defect === '1') {
    await Progress.updateOne({ name: name }, { $inc: { defect_cnt: 1 } });
    await Total.updateOne({ name: name }, { $inc: { defect_cnt: 1 } });
  }

  const { worker, state, prod_vol, defect_cnt } = await Progress.findOne({ name: name });
  const { tar_vol } = await Target.findOne({ name: name });

  await Total.updateOne(
    { name: name },
    {
      $set: {
        worker: worker,
        state: state,
        tar_vol: tar_vol,
        defect_cnt: defect_cnt,
        now: prod_vol / tar_vol,
        defect_rate: defect_cnt / prod_vol,
      },
    },
  );
};

exports.insertProgress = async (ctx) => {
  await Progress.insertOne(ctx);
  console.log('insert success');
};

exports.insertTarget = async (ctx) => {
  const { name, tar_vol } = ctx.request.body;
  Number(tar_vol);
  console.log(name, tar_vol);

  await Target.updateOne({ name: name }, { $set: { tar_vol: tar_vol } });
  await Total.updateOne({ name: name }, { $set: { tar_vol: tar_vol } });
  ctx.body = { message: '입력 성공!' };
};

exports.insertWeight = async (ctx) => {
  await Weight.insertOne(ctx);
  console.log('insert success');
};

exports.getBoardList = async (ctx) => {
  ctx.body = await Board.find().toArray();
};

exports.getBoardDetail = async (ctx) => {
  const { title } = ctx.request.body;
  const { contents, email, date } = await Board.findOne({ title: title });
  ctx.body = { title, contents, email, date };
};

exports.insertBoard = async (ctx) => {
  await Board.insertOne(ctx.request.body);
  ctx.body = { message: '게시글 작성 완료' };
};
