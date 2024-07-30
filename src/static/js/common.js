//* 데이터표출
async function getdata() {
    try {
      const { data } = await axios.get("/data");
  
      /* 초기화 */
      const parent = document.querySelector("#section2 div.graph_wrap");
      while (parent.firstChild) {
        parent.firstChild.remove();
      }
  
      drawtab_bs(data, "t");

      // 각 차트 업데이트
      //await Promise.all(charts.map((chart) => chart.update()));
  
    } catch (e) {
      console.error(e);
    }
  }

  // function insertData() {
  //   fetch('/adddata', {
  //     method: 'POST'
  //   })
  //   .then(data => {
  //     console.log('서버 응답:', data);
  //   })
  //   .catch(error => {
  //     console.error('오류:', error);
  //   });
  // }
  function insertData(data) {
    axios.post('/upload-mat-data', data)
        .then(response => {
          // 성공 시 처리
          console.log('서버 응답:', response.data);
          alert('데이터가 성공적으로 삽입되었습니다!');
        })
        .catch(error => {
          // 오류 시 처리
          console.error('오류:', error);
          alert('데이터 삽입에 실패했습니다.');
        });
  }

function drawtab_bs(rows, tabid, type) {
    /* 초기화 */
    const parent = document.getElementById(tabid);
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  
    if (!rows || rows.length === 0 || !document.getElementById(tabid)) {
      return;
    }
    const cols = Object.keys(rows[0]);
  
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");
  
    tbody.id = "id_tbody";
  
    table.id = `t_${tabid}`;
    table.className = "table table-sm table-hover table-data text-center";
    table.style.whiteSpace = "nowrap";
    table.style.cssText = "font-size: 12px;";
  
    headerRow.className = "table-primary text-center";
    headerRow.id = "id_theader";
  
    thead.style.cssText =
      "background-color: #ebedf4; color: #555; font-size: 13px; border-top: 1px solid #bec1d1; border-bottom: 1px solid #bec1d1;";
  
    tbody.style.cssText = "border-top: 0px;";
  
    thead.innerHTML = `
        <tr>
          <th scope="col">번호</th>
          <th scope="col">data1</th>
          <th scope="col">data2</th>
        </tr>
      `;
  
    rows.forEach((item, index) => {
      const row = document.createElement("tr");
      row.id = `row-${index + 1}`;
      if (!type) {
        const nocell = document.createElement("td");
        nocell.innerHTML = index + 1;
        nocell.scope = "col";
        row.appendChild(nocell);
      } else {
        row.onclick = () => {
          const params = new URLSearchParams(item).toString();
          location.href = `add${type}?${params}`;
        };
      }
      cols.forEach((col) => {
        const cell = document.createElement("td");
        let val = "";
         
         // 데이터 값이 0인 경우에도 빈 문자열 대신 0이 표시되도록 설정
         if (item[col] !== undefined && item[col] !== null) {
            val = item[col];
        }
  
        // 측정시간(MeasurementTime) 컬럼을 날짜와 시간 형식으로 변환
        if (col === "MeasurementTime" && val) {
          val = new Date(val).toLocaleString(); // Date 객체로 변환하여 로컬 시간 형식으로 표시
        }
  
        cell.innerHTML = val;
        cell.scope = "col";
        cell.setAttribute("col", col);
  
        // 값 컬럼의 텍스트를 오른쪽 정렬
        if (col === "Value") {
          cell.style.textAlign = "right";
        }
  
        row.appendChild(cell);
      });
  
      tbody.appendChild(row);
    });
  
    table.appendChild(thead);
    table.appendChild(tbody);
  
    document.getElementById(tabid).appendChild(table);
  }