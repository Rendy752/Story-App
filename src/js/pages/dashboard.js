const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchData = require('../../public/data/DATA');
    const data = await fetchData();
    if (!data) {
      throw new Error('Data is not found');
    }
    console.log(data);
    this._stories = data;
  },

  _templateBodyTable(index, transactionRecord) {
    return `
        <tr>
          <th class="text-center">${parseInt(index, 10) + 1}</th>
          <td>${
            transactionRecord.type === 'income' ? 'Pemasukan' : 'Pengeluaran'
          }</td>
          <td>${transactionRecord.name}</td>
          <td>${transactionRecord.amount}</td>
          <td>${transactionRecord.date}</td>
          <td>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <a class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#recordDetailModal" 
               data-record-id="${transactionRecord.id}">
                <i class="bi bi-eye-fill me-1"></i>Show
              </a>
              <a class="btn btn-sm btn-warning" href="/transactions/edit.html?id=${
                transactionRecord.id
              }">
                <i class="bi bi-pen-fill me-1"></i>Edit
              </a>
              <a class="btn btn-sm btn-danger" href="#">
                <i class="bi bi-trash3-fill me-1"></i>Delete
              </a>
            </div>
          </td>
        </tr>
      `;
  },

  _templateEmptyBodyTable() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
        <tr>
          <td colspan="${recordHeadTable.querySelectorAll('td,th').length}">
            <div class="text-center">Tidak ada catatan transaksi</div>
          </td>
        </tr>
      `;
  },
};

export default Dashboard;
