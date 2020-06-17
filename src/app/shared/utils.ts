import * as moment from 'moment';

export const  formataData = (data): String => {
    let dtFormatada;
    dtFormatada = moment(`${data[0]}-${data[1]}-${data[2]} ${data[3]}:${data[4]}:${data[5]}`, "YYYY-MM-DD h:mm:ss").format("DD-MM-YYYY h:mm:ss");
    return dtFormatada
  }