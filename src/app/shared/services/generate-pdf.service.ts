import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { TypePayload } from '../payload/payload.model';
import { Logo } from '../enum/logo.enum';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  //*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  DoExportPDF(item: TypePayload) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    (window as any).pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    };
    const content: any = {
      content: [
        {
          image: 'image_Widget-ddd9f745-4ec5-0394-113c-fa4780911c48',
          fit: [120, 120],
          alignment: 'center',
          // absolutePosition: { x: 150, y: 150 },
          relativePosition: { x: 0, y: 10 },
        },
        {
          text: 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 100, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: 'มหาวิทยาลัยพะเยา',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 20 },
        },
        {
          text: 'ตำบลแม่กา  อำเภอเมือง',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 40 },
        },
        {
          text: 'จังหวัดพะเยา  ๕๖๐๐๐',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 60 },
        },
        {
          text: 'ที่ อว ๗๓๑๙ / ว ๐๓๔๓',
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: '๑๙  ตุลาคม  ๒๕๖๕',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 60, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: 'เรื่อง	ขอส่งนิสิตเข้าฝึกงาน',
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 20 },
        },
        {
          text: 'เรียน	คุณนัษฐ์ ศรีไสววิไล (บริษัท มัลเบอร์รี่ ซอฟต์ จำกัด)',
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 40 },
        },
        {
          text: 'ตามที่ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา ได้รับความอนุเคราะห์จากสถานประกอบการของท่านในการรับนิสิตฝึกงาน ประจำปีการศึกษา 256๕ และได้พิจารณาคัดเลือกนิสิตเข้าฝึกงานกับสถานประกอบการของท่านเรียบร้อยแล้ว นั้น',
          fontSize: 16,
          alignment: 'left',
          margin: [50, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 60 },
        },
        {
          text: 'ในการนี้ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา จึงขอส่งนิสิตเข้าฝึกงาน ในระหว่างวันที่ ๑ พฤศจิกายน ๒๕๖๕ ถึงวันที่ ๑๗ กุมภาพันธ์ ๒๕๖๖ โดยหวังเป็นอย่างยิ่งว่าจะได้รับความร่วมมือจากท่านในโอกาสต่อไป และขอขอบพระคุณมา ณ โอกาสนี้ ทั้งนี้ หากมีข้อสงสัยสามารถสอบถามได้ที่ ดร.นราศักดิ์ บุญเทพ อาจารย์ที่ปรึกษานิสิตฝึกงาน ผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๑-๘๑๔ ๘๘๘๙ ',
          fontSize: 16,
          alignment: 'left',
          margin: [50, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 120 },
        },
        {
          text: 'จึงเรียนมาเพื่อโปรดทราบ จะขอบคุณยิ่ง',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 250, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: 'ขอแสดงความนับถือ',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 40, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: '(ผู้ช่วยศาสตราจารย์ ดร.พรเทพ  โรจนวสุ)',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 60 },
        },
        {
          text: 'คณะบดีคณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 80 },
        },
        {
          style: 'tableExample',
          relativePosition: { x: 0, y: 200 },
          alignment: 'center',
          table: {
            alignment: 'center',
            body: [
              ['Column 1', 'Column 2', 'Column 3', 'Column 4' , 'Column 5', 'Column 6'],
              [item.surname, 'Another one here', 'OK?','OK?','OK?','OK?'],
            ],
          },
        },
      ],
      styles: {},
      // content: [
      //   {
      //     text: 'ทดสอบการสร้าง pdf ' + item.surname,
      //     fontSize: 18,
      //     alignment: 'center',
      //   },
      // ],
      // content: [
      //   {
      //     columnGap: 30,
      //     columns: [
      //       {
      //         text: 'ที่ อว ๗๓๑๙ / ว ๐๓๔๓',
      //         fontSize: 14,
      //         alignment: 'left',
      //         // absolutePosition: { x: 150, y: 150 },
      //         relativePosition: { x: 0, y: 10 },
      //       },
      //       {
      //         image: 'image_Widget-ddd9f745-4ec5-0394-113c-fa4780911c48',
      //         fit: [150, 150], // Specify the desired width and height of the image
      //         alignment: 'center',
      //       },
      //       {
      //         text: 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร',
      //         fontSize: 14,
      //         alignment: 'right',
      //         // absolutePosition: { x: 150, y: 150 },
      //         relativePosition: { x: 0, y: 10 },
      //       },
      //       {
      //         text: 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร',
      //         fontSize: 14,
      //         alignment: 'right',
      //         // absolutePosition: { x: 150, y: 150 },
      //         relativePosition: { x: -180, y: 50 },
      //       },
      //     ],
      //   },
      // ],
      defaultStyle: {
        font: 'THSarabunNew',
      },
      images: {
        'image_Widget-ddd9f745-4ec5-0394-113c-fa4780911c48': Logo.up_logo,
      },
      // watermark: {
      //   text: 'ลายน้ำแบบคาด',
      //   color: 'blue',
      //   opacity: 0.1,
      //   bold: true,
      // },
    };
    pdfMake.createPdf(content).open();
  }
}
