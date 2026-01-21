// Event data storage
let events = [];

// Color palette for event indicators
const colors = ['google-blue', 'google-red', 'google-yellow', 'google-green'];

// DOM Elements
const eventInput = document.getElementById('eventInput');
const addEventBtn = document.getElementById('addEventBtn');
const eventList = document.getElementById('eventList');
const emptyState = document.getElementById('emptyState');
const eventCount = document.getElementById('eventCount');

/**
 * Render all events to the DOM
 */
function renderEvents() {
    if (events.length === 0) {
        eventList.innerHTML = '';
        emptyState.classList.remove('hidden');
        eventCount.textContent = '0 events';
        return;
    }

    emptyState.classList.add('hidden');
    eventCount.textContent = `${events.length} event${events.length > 1 ? 's' : ''}`;

    eventList.innerHTML = events.map((event, index) => {
        const color = colors[index % colors.length];
        return createEventHTML(event, index, color);
    }).join('');
}

/**
 * Create HTML for a single event item
 */
function createEventHTML(event, index, color) {
    return `
        <li class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-${color} rounded-full"></div>
            </div>
            <span class="flex-1 text-gray-700 ${event.completed ? 'line-through text-gray-400' : ''}">${event.text}</span>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onclick="toggleEvent(${index})"
                    class="px-3 py-1 text-sm ${event.completed ? 'bg-gray-200 text-gray-600' : 'bg-google-green text-white'} rounded hover:opacity-80 transition-opacity">
                    ${event.completed ? 'Undo' : 'Done'}
                </button>
                <button 
                    onclick="deleteEvent(${index})"
                    class="px-3 py-1 text-sm bg-google-red text-white rounded hover:opacity-80 transition-opacity">
                    Delete
                </button>
            </div>
        </li>
    `;
}

/**
 * Add a new event
 */
function addEvent() {
    const text = eventInput.value.trim();

    if (text === '') {
        alert('Please enter an event name');
        return;
    }

    events.push({
        text: text,
        completed: false
    });

    eventInput.value = '';
    renderEvents();
}

/**
 * Toggle event completion status
 */
function toggleEvent(index) {
    events[index].completed = !events[index].completed;
    renderEvents();
}

/**
 * Delete an event
 */
function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

// Event Listeners
addEventBtn.addEventListener('click', addEvent);

eventInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addEvent();
    }
});

// Initialize app
renderEvents();