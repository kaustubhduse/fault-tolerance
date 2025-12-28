async function submitEvent() {
  const input = document.getElementById('eventInput').value
  const resultEl = document.getElementById('submitResult')
  const simulate = document.getElementById('simulateFailure').checked

  let json
  try {
    json = JSON.parse(input)
  } catch {
    resultEl.textContent = 'Invalid JSON'
    resultEl.className = 'error'
    return
  }

  resultEl.textContent = 'Submitting...'
  resultEl.className = 'muted'

  try {
    const res = await fetch('/ingest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(simulate ? { 'X-SIMULATE-FAIL': '1' } : {})
      },
      body: JSON.stringify(json)
    })

    const data = await res.json()

    if (data.ok) {
      resultEl.textContent = data.deduped
        ? 'Event already processed (deduplicated)'
        : 'Event processed successfully'
      resultEl.className = 'success'
    } else {
      resultEl.textContent = data.reason || 'Error'
      resultEl.className = 'error'
    }
  } catch (err) {
    resultEl.textContent = 'Network error'
    resultEl.className = 'error'
  }

  loadAll()
}

async function loadProcessedEvents() {
  const container = document.getElementById('processedEvents')
  const res = await fetch('/events/processed')
  const data = await res.json()

  if (!data.events.length) {
    container.textContent = 'No processed events'
    return
  }

  container.innerHTML = renderTable(
    ['Client', 'Metric', 'Amount', 'Timestamp'],
    data.events.map(e => [
      e.client_id,
      e.metric,
      e.amount,
      e.timestamp
    ])
  )
}

async function loadFailedEvents() {
  const container = document.getElementById('failedEvents')
  const res = await fetch('/events/failed')
  const data = await res.json()

  if (!data.failed.length) {
    container.textContent = 'No failed events'
    return
  }

  container.innerHTML = renderTable(
    ['Reason', 'Raw Event'],
    data.failed.map(e => [
      e.reason,
      JSON.stringify(e.raw)
    ])
  )
}

async function loadAggregates() {
  const container = document.getElementById('aggregates')
  const res = await fetch('/aggregates')
  const data = await res.json()

  if (!data.aggregates.length) {
    container.textContent = 'No aggregates available'
    return
  }

  container.innerHTML = renderTable(
    ['Client', 'Metric', 'Count', 'Total'],
    data.aggregates.map(a => [
      a.client_id,
      a.metric,
      a.count,
      a.total
    ])
  )
}

function renderTable(headers, rows) {
  let html = '<table><tr>'
  headers.forEach(h => (html += `<th>${h}</th>`))
  html += '</tr>'

  rows.forEach(row => {
    html += '<tr>'
    row.forEach(col => (html += `<td>${col}</td>`))
    html += '</tr>'
  })

  html += '</table>'
  return html
}

function loadAll() {
  loadProcessedEvents()
  loadFailedEvents()
  loadAggregates()
}

loadAll()
