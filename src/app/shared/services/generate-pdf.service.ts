import { Injectable, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { TypePayload } from '../payload/payload.model';
import { Logo } from '../enum/logo.enum';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService implements OnInit {
  /* -------------------------------------------------------------------------- */
  //*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}

  /* -------------------------------------------------------------------------- */
  //*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  day = new Date().getDate();
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  /* -------------------------------------------------------------------------- */
  //*                                 Life Circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {}

  /* -------------------------------------------------------------------------- */
  //*                                    Logic                                   */
  /* -------------------------------------------------------------------------- */
  DoConvertToThaiScript(number: string) {
    const arabicNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const thaiNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

    let thaiScript = '';
    for (let i = 0; i < number.length; i++) {
      const digit = number.charAt(i);
      const index = arabicNumerals.indexOf(digit);
      if (index !== -1) {
        thaiScript += thaiNumerals[index];
      } else {
        thaiScript += digit; // Keep non-digit characters unchanged
      }
    }
    console.log(thaiScript);
    return thaiScript;
  }

  DoConvertToThaiMonth(number: number) {
    const thaiMonths = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ];

    if (number >= 1 && number <= 12) {
      return thaiMonths[number - 1];
    } else {
      return 'Invalid month number';
    }
  }

  /* -------------------------------------------------------------------------- */
  //*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  DoExportPDF(item: TypePayload) {
    const day = this.DoConvertToThaiScript(this.day.toString());
    const month = this.DoConvertToThaiMonth(this.month);
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
    const content: TypePayload = {
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
          text: day + ' ' + month + ' ' + '๒๕๖๕',
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
          text: 'เรียน' + ' ' + ' ' + ' ' + item.position_company,
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 40 },
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [50, 0, 0, 0],
              relativePosition: { x: 0, y: 70 },
              width: '110%',
              text: 'ตามที่ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยาได้รับความอนุเคราะห์จากสถานประกอบการ',
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [0, 0, 0, 0],
              relativePosition: { x: 0, y: 90 },
              width: '115%',
              text: 'ของท่านในการรับนิสิตฝึกงาน ประจำปีการศึกษา 2566 และได้พิจารณาคัดเลือกนิสิตเข้าฝึกงานกับสถานประกอบการของท่าน',
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [0, 0, 0, 0],
              relativePosition: { x: 0, y: 110 },
              width: '115%',
              text: 'เรียบร้อยแล้ว นั้น',
            },
          ],
        },
        {
          text: [
            'ในการนี้ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา  ',
            'จึงขอนำนิสิตเข้าฝึกงาน ',
            { text: 'ระหว่างวันที่ ๑', fontSize: 15, bold: true },
          ],
          width: '110%',
          margin: [50, 0, 0, 0],
          fontSize: 16,
          relativePosition: { x: 0, y: 130 },
        },
        {
          text: [
            {
              text: 'พฤศจิกายน ๒๕๖๕ ถึงวันที่ ๑๗ กุมภาพันธ์ ๒๕๖๖ ',
              fontSize: 15,
              bold: true,
            },
            'โดยหวังเป็นอย่างยิ่งว่าจะได้รับความร่วมมือจากท่านในโอกาสต่อไปขอนำ ',
            'นิสิตเข้าฝึกงาน และขอขอบพระคุณมา ณ โอกาสนี้ ทั้งนี้ หากมีข้อสงสัยสามารถสอบถามเพิ่มเติมได้ที่ ดร.นราศักดิ์  บุญเทพ อาจารย์',
            'ที่ปรึกษานิสิตฝึกงาน ผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๑-๘๑๔ ๘๘๘๙ ',
          ],
          width: '110%',
          margin: [0, 0, 0, 0],
          fontSize: 16,
          relativePosition: { x: 0, y: 150 },
        },
        {
          text: 'จึงเรียนมาเพื่อโปรดทราบ จะขอบคุณยิ่ง',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 250 },
        },
        {
          text: 'ขอแสดงความนับถือ',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 270 },
        },
        {
          text: '( ผู้ช่วยศาสตราจารย์ ดร.พรเทพ  โรจนวสุ )',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 350 },
        },
        {
          text: 'คณบดีคณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 370 },
        },
        // {
        //   text: [
        //     {
        //       text: 'พฤศจิกายน ๒๕๖๕ ถึงวันที่ ๑๗ กุมภาพันธ์ ๒๕๖๖ ',
        //       fontSize: 15,
        //       bold: true,
        //     },
        //     'โดยหวังเป็นอย่างยิ่งว่าจะได้รับความร่วมมือจากท่านในโอกาสต่อไปขอนำ ',
        //     'นิสิตเข้าฝึกงาน และขอขอบพระคุณมา ณ โอกาสนี้ ทั้งนี้ หากมีข้อสงสัยสามารถสอบถามเพิ่มเติมได้ที่ ดร.นราศักดิ์  บุญเทพ อาจารย์',
        //     'ที่ปรึกษานิสิตฝึกงาน ผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๑-๘๑๔ ๘๘๘๙ ',
        //   ],
        //   width: '110%',
        //   margin: [0, 1000, 0, 0],
        //   fontSize: 16,
        //   relativePosition: { x: 0, y: 1000 },
        // },
        {
          text: [
            {
              text: 'งานวิชาการ คณะเทคโนโลยีสารสนเทศและการสื่อสาร\n',
              fontSize: 16,
              // bold: true,
            },
            {
              text: 'โทร ๐-๕๔๔๖-๖๖๖๖ ต่อ ๒๓๒๓\n',
              fontSize: 16,
              // bold: true,
            },
            {
              text: 'e-mail : narasak.bo@up.ac.th',
              fontSize: 16,
              // bold: true,
            },
          ],
          pageBreak: 'before',
        },
        {
          text: 'รายชื่อนิสิตฝึกงานสาขาวิชาวิศวกรรมคอมพิวเตอร์',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 30, 0, 0],
        },
        {
          text: 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          text: 'มหาวิทยาลัยพะเยา',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          text: 'สถานที่ฝึกงาน  บริษัท มัลเบอร์รี่ ซอฟต์ จำกัด',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        // {
        //   style: 'tableExample',
        //   table: {
        //     body: [
        //       [
        //         'Column 1               ',
        //         'Column 2',
        //         'Column 3',
        //         'Column 4',
        //         'Column 5',
        //         'Column 6',
        //       ],
        //     ],
        //   },
        // },

        // {
        //   table: {
        //     body: [
        //       [
        //         {
        //           text: 'ลำดับที่',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'รหัสนิสิต',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'ชื่อ - สกุล',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'เบอร์โทรศัพท์',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'ชั้นปี',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'หมายเหตุ',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //       ],
        //       [
        //         'fixed-width cells have exactly the specified width',
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //       ],
        //     ],
        //   },
        //   relativePosition: { x: 0, y: 0 },
        //   margin: [0, 10, 0, 0], // Add top margin of 0 units
        // },
      ],
      styles: {},
      defaultStyle: {
        font: 'THSarabunNew',
      },
      images: {
        'image_Widget-ddd9f745-4ec5-0394-113c-fa4780911c48': Logo.up_logo,
      },
      watermark: {
        text: 'ขอส่งนิสิตเข้าฝึกงาน',
        color: 'blue',
        opacity: 0.1,
        bold: true,
      },
    };
    const ToObject = [item];
    console.log(ToObject.length);

    for (var i = 0; i < ToObject.length; i++) {
      var section = {
        table: {
          widths: ['*', '*', '*', '*', '*', '*'], // Specify the widths of the columns
          body: [
            [
              {
                text: 'ลำดับที่',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'รหัสนิสิต',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'ชื่อ - สกุล',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'เบอร์โทรศัพท์',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'ชั้นปี',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'หมายเหตุ',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
            ],
            [
              {
                text: i + 1,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.student_code,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.name + ' ' + item.surname,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.phone_number,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.year,
                // italics: true,
                // color: 'gray',
              },
              {
                text: '-',
                // italics: true,
                // color: 'gray',
              },
            ],
          ],
        },
        // relativePosition: { x: 0, y: 0 },
        // margin: [0, 0, 0, 0], // Add top margin of 0 units
        // text: 'Section ' + (i + 1),
        alignment: 'center',
      };
      content.content.push(section);
    }

    pdfMake.createPdf(content).open();
  }

  DoExportPDF2(item: TypePayload) {
    const day = this.DoConvertToThaiScript(this.day.toString());
    const month = this.DoConvertToThaiMonth(this.month);
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
    const content: TypePayload = {
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
          text: day + ' ' + month + ' ' + '๒๕๖๕',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 60, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 0 },
        },
        {
          text: 'เรื่อง	ขอความอนุเคราะห์รับนิสิตฝึกงาน',
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 20 },
        },
        {
          text: 'เรียน' + ' ' + ' ' + ' ' + item.position_company,
          fontSize: 16,
          alignment: 'left',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 40 },
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [50, 0, 0, 0],
              relativePosition: { x: 0, y: 70 },
              width: '110%',
              text: '๑. สิ่งที่ส่งมาด้วย	๑. รายชื่อนิสิต					จำนวน  ๑  ฉบับ',
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [50, 0, 0, 0],
              relativePosition: { x: 0, y: 90 },
              width: '115%',
              text: '๒. แบบตอบรับ/ปฏิเสธ การรับนิสิตเข้าฝึกงาน	จำนวน  ๑  ฉบับ',
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [50, 0, 0, 0],
              relativePosition: { x: 0, y: 110 },
              width: '120%',
              text: 'ด้วยคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา ได้เปิดการเรียนการสอนรายวิชาการฝึกงานนั้น',
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [0, 0, 0, 0],
              relativePosition: { x: 0, y: 130 },
              width: '120%',
              text: [
                'ซึ่งรายวิชาดังกล่าวมีวัตถุประสงค์เพื่อให้นิสิตได้ฝึกทักษะความชำนาญทางด้านคอมพิวเตอร์ตลอดจนการนำคอมพิวเตอร์เข้ามา\n',
                'ประยุกต์ใช้กับงานด้านต่าง ๆ ในองค์กร',
              ],
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [50, 0, 0, 0],
              relativePosition: { x: 0, y: 170 },
              width: '115%',
              text: [
                'ในการนี้ คณะเทคโนโลยีสารสนเทศและการสื่อสาร ได้พิจารณาแล้วเห็นว่าหน่วยงานของท่านมีความเหมาะสมอย่าง\n',
              ],
            },
          ],
        },
        {
          columns: [
            {
              fontSize: 16,
              margin: [0, 0, 0, 0],
              relativePosition: { x: 0, y: 190 },
              width: '115%',
              text: [
                'ยิ่งในการถ่ายทอดความรู้ด้านทฤษฎีและการปฏิบัติให้กับนิสิตได้เป็นอย่างดี จึงใคร่ขอความอนุเคราะห์ท่านรับนิสิตฝึกงาน\n',
                {
                  text: 'ในระหว่างวันที่ ๑ พศจิกานยน ๒๕๖๕ ถึง 2 พศจิกานยน ๒๕๖๕',
                  fontSize: 15,
                  bold: true,
                },
                ' ' +
                  'โดยหวังเป็นอย่างยิ่งว่าจะได้รับความอนุเคราะห์จากท่าน \n และขอขอบพระคุณ มา ณ โอกาสนี้ ทั้งนี้ หากมีข้อสงสัยสามารถสอบถามเพิ่มเติมได้ที่ ดร.นราศักดิ์ บุญเทพ อาจารย์ที่ปรึกษา\n นิสิตฝึกงาน ผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๑-๘๑๔ ๘๘๘๙ ',
              ],
            },
          ],
        },
        {
          text: 'จึงเรียนมาเพื่อโปรดพิจารณาให้ความอนุเคราะห์ จะขอบคุณยิ่ง',
          fontSize: 16,
          alignment: 'center',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 295 },
        },
        {
          text: 'ขอแสดงความนับถือ',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 335 },
        },
        {
          text: '( ผู้ช่วยศาสตราจารย์ ดร.พรเทพ  โรจนวสุ )',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 420 },
        },
        {
          text: 'คณบดีคณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0], // Add top margin of 0 units
          relativePosition: { x: 0, y: 440 },
        },
        // {
        //   text: [
        //     {
        //       text: 'พฤศจิกายน ๒๕๖๕ ถึงวันที่ ๑๗ กุมภาพันธ์ ๒๕๖๖ ',
        //       fontSize: 15,
        //       bold: true,
        //     },
        //     'โดยหวังเป็นอย่างยิ่งว่าจะได้รับความร่วมมือจากท่านในโอกาสต่อไปขอนำ ',
        //     'นิสิตเข้าฝึกงาน และขอขอบพระคุณมา ณ โอกาสนี้ ทั้งนี้ หากมีข้อสงสัยสามารถสอบถามเพิ่มเติมได้ที่ ดร.นราศักดิ์  บุญเทพ อาจารย์',
        //     'ที่ปรึกษานิสิตฝึกงาน ผู้ประสานงาน หมายเลขโทรศัพท์ ๐๘๑-๘๑๔ ๘๘๘๙ ',
        //   ],
        //   width: '110%',
        //   margin: [0, 1000, 0, 0],
        //   fontSize: 16,
        //   relativePosition: { x: 0, y: 1000 },
        // },
        {
          text: [
            {
              text: 'งานวิชาการ คณะเทคโนโลยีสารสนเทศและการสื่อสาร\n',
              fontSize: 16,
              // bold: true,
            },
            {
              text: 'โทร ๐-๕๔๔๖-๖๖๖๖ ต่อ ๒๓๒๓\n',
              fontSize: 16,
              // bold: true,
            },
            {
              text: 'e-mail : narasak.bo@up.ac.th',
              fontSize: 16,
              // bold: true,
            },
          ],
          pageBreak: 'before',
        },
        {
          text: 'รายชื่อนิสิตฝึกงานสาขาวิชาวิศวกรรมคอมพิวเตอร์',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 30, 0, 0],
        },
        {
          text: 'คณะเทคโนโลยีสารสนเทศและการสื่อสาร',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          text: 'มหาวิทยาลัยพะเยา',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          text: 'สถานที่ฝึกงาน  บริษัท มัลเบอร์รี่ ซอฟต์ จำกัด',
          fontSize: 26,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        // {
        //   style: 'tableExample',
        //   table: {
        //     body: [
        //       [
        //         'Column 1               ',
        //         'Column 2',
        //         'Column 3',
        //         'Column 4',
        //         'Column 5',
        //         'Column 6',
        //       ],
        //     ],
        //   },
        // },

        // {
        //   table: {
        //     body: [
        //       [
        //         {
        //           text: 'ลำดับที่',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'รหัสนิสิต',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'ชื่อ - สกุล',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'เบอร์โทรศัพท์',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'ชั้นปี',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'หมายเหตุ',
        //           alignment: 'center',
        //           bold: true,
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //       ],
        //       [
        //         'fixed-width cells have exactly the specified width',
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //         {
        //           text: 'nothing interesting here',
        //           // italics: true,
        //           // color: 'gray',
        //         },
        //       ],
        //     ],
        //   },
        //   relativePosition: { x: 0, y: 0 },
        //   margin: [0, 10, 0, 0], // Add top margin of 0 units
        // },
      ],
      styles: {},
      defaultStyle: {
        font: 'THSarabunNew',
      },
      images: {
        'image_Widget-ddd9f745-4ec5-0394-113c-fa4780911c48': Logo.up_logo,
      },
      watermark: {
        text: 'ขอความอนุเคราะห์รับนิสิตฝึกงาน',
        color: 'blue',
        opacity: 0.1,
        bold: true,
      },
    };
    const ToObject = [item];
    console.log(ToObject.length);

    for (var i = 0; i < ToObject.length; i++) {
      var section = {
        table: {
          widths: ['*', '*', '*', '*', '*', '*'], // Specify the widths of the columns
          body: [
            [
              {
                text: 'ลำดับที่',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'รหัสนิสิต',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'ชื่อ - สกุล',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'เบอร์โทรศัพท์',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'ชั้นปี',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
              {
                text: 'หมายเหตุ',
                alignment: 'center',
                bold: true,
                // italics: true,
                // color: 'gray',
              },
            ],
            [
              {
                text: i + 1,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.student_code,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.name + ' ' + item.surname,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.phone_number,
                // italics: true,
                // color: 'gray',
              },
              {
                text: item.year,
                // italics: true,
                // color: 'gray',
              },
              {
                text: '-',
                // italics: true,
                // color: 'gray',
              },
            ],
          ],
        },
        // relativePosition: { x: 0, y: 0 },
        // margin: [0, 0, 0, 0], // Add top margin of 0 units
        // text: 'Section ' + (i + 1),
        alignment: 'center',
      };
      content.content.push(section);
    }

    pdfMake.createPdf(content).open();
  }
}
