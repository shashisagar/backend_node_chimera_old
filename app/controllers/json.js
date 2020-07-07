
function formatModel(model) {
  if (!model) {
    return;
  } else {
    const jsonModel = model;

    delete jsonModel.__v;
    delete jsonModel.createdAt;
    delete jsonModel.updatedAt;

    Object.keys(jsonModel).forEach((key) => {
      if (key === '_id') {
        jsonModel.id = jsonModel._id.toString();
        delete jsonModel._id;
      }

      if (typeof model[key] === 'object') {
        jsonModel[key] = formatModel(model[key]);
      }
    });
    return model;
  }
}

module.exports.formatModel = formatModel;
