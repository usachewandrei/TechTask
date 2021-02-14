let events = new Map()

let data = [
    'Days<br\/> Hours',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
]
let hours = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];
let members = [
    'Andrei',
    'Petro',
    'Vasia'
]

const selectFilter = document.getElementById('members')

let btnDel = document.createElement('button')

let render = () => {
    // console.log(events);

    let elem = document.querySelector('.elem')
    elem.innerHTML = '';
    let table = document.createElement('table')
    let tr = document.createElement('tr')
    data.forEach(element => {
        td = document.createElement('td')
        td.innerHTML = element;
        tr.appendChild(td)
    });
    table.appendChild(tr)

    for (let index = 0; index < hours.length; index++) {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerHTML = hours[index]
        tr.appendChild(td)
        for (let a = 1; a < data.length; a++) {
            td = document.createElement('td')
            if (events.has(hours[index] + data[a])) {
                let ev = events.get(hours[index] + data[a])

                if (selectFilter.value !== 'All members' && selectFilter.value !== ev.member) {
                    td.innerHTML = '';
                } else {
                    td.classList.add('table-success')

                    td.innerHTML = ev.name;
                    btnDel.classList.add('button-delete')
                    btnDel.innerHTML = `&times`
                    td.append(btnDel)
                    btnDel.addEventListener('click', () => {
                        if (events.has(hours[index] + data[a])) {
                            events.delete(hours[index] + data[a])
                            render()
                        };
                    })
                }
            } else {
                td.innerHTML = '';
            }
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    elem.appendChild(table)
}
function select(id, data) {
    let select = document.getElementById(id)
    data.forEach((element) => {
        let option = document.createElement('option')
        option.innerHTML = element
        select.appendChild(option)
    })
}
select('members', members)
select('modal_hour', hours)
select('modal_day', data.slice(1))
select('modal_members', members)

let modal = document.querySelector('.modal')
let modalCloseBtn = document.querySelector('[data-close]')
let btn = document.querySelector('.btn').addEventListener('click', (e) => {
    modal.style.display = 'block'
})
modalCloseBtn.addEventListener('click', closeModal)
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ''
}
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal()
    }
})

document.getElementById('create_event').addEventListener('click', e => {
    e.preventDefault()
    let hour = document.querySelector('.hours').value
    let day = document.querySelector('.day').value
    let name = document.querySelector('.modal__input').value.substring(0, 10)
    let member = document.querySelector('#modal_members').value
    events.set(hour + day, { name, member })
    render()
    closeModal()
})

selectFilter.addEventListener('change', () => render())
render()

