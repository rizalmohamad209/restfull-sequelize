const { mhs } = require("../models/");

module.exports = {
  getAllMhs: (req, res) => {
    mhs
      .findAll()
      .then((data) => {
        res.send({
          msg: "Success Get All data is Successful",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Error While Get all data",
          status: 500,
          err,
        });
      });
  },
  createMhs: (req, res) => {
    const { body } = req;
    console.log("====================================");
    console.log(body);
    console.log("====================================");
    mhs
      .create(body)
      .then((data) => {
        res.send({
          msg: "Successful Create Data mhs",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Failed While Create Mhs",
          status: 500,
          err,
        });
      });
  },
  updateMhs: async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    let findMhs = await mhs.findOne({
      where: {
        id,
      },
    });

    if (findMhs === null) {
      res.status(404).send({
        msg: "Update Mahasiswa is Error",
        status: 404,
        error: "Data is Not Found",
      });
    }
    mhs
      .update(body, {
        where: {
          id,
        },
      })
      .then((data) => {
        console.log("====================================");
        console.log(findMhs);
        console.log("====================================");
        const resObject = { ...findMhs.datavalues, ...body };
        res.send({
          mgs: "Successful Update Data Mahasiswa",
          status: 200,
          data: resObject,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Failed While Update Data Mahasiswa",
          status: 500,
          err,
        });
      });
  },
  deleteMhs: async (req, res) => {
    const { id } = req.params;
    let findMhs = await mhs.findOne({
      where: {
        id,
      },
    });
    if (findMhs === null) {
      res.status(404).send({
        msg: "Delete Mahasiswa is Error",
        status: 404,
        error: "Data is Not Found",
      });
    }
    mhs
      .destroy({
        where: {
          id,
        },
      })
      .then((data) => {
        res.send({
          msg: "Success Delete Data mahasiswa",
          status: 200,
          data: findMhs,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Error While Delete Data Mahasiswa",
          status: 500,
          err,
        });
      });
  },
  getMhsById: (req, res) => {
    const { id } = req.params;
    mhs
      .findOne({
        where: {
          id,
        },
      })
      .then((data) => {
        res.send({
          msg: "Succes Get Data Mahasiswa By Id",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Failed Get Data Mahasiswa By Id",
          status: 500,
          err,
        });
      });
  },
};
