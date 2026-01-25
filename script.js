// Event data storage
let events = [{
text: "Workshop: Introduction to Git & GitHub",
category: "workshop",
completed: false
},
{
text: "Study Group: Web Development Fundamentals",
category: "study-group",
completed: false
},
{
text: "GDGoC Weekly Meeting",
 category: "meeting",
completed: true
}];

// Color palette for event indicators
const colors = ["google-blue", "google-red", "google-yellow", "google-green"];

// Category styling
const categoryStyles = {
  workshop: {
    badge: "bg-google-blue text-white",
    label: "Workshop",
  },
  meeting: {
    badge: "bg-google-green text-white",
    label: "Meeting",
  },
  "study-group": {
    badge: "bg-google-yellow text-gray-800",
    label: "Study Group",
  },
  competition: {
    badge: "bg-google-red text-white",
    label: "Competition",
  },
};

// DOM Elements
const eventInput = document.getElementById("eventInput");
const addEventBtn = document.getElementById("addEventBtn");
const categorySelect = document.getElementById("categorySelect");
const eventList = document.getElementById("eventList");
const emptyState = document.getElementById("emptyState");
const eventCount = document.getElementById("eventCount");

/**
 * Render all events to the DOM
 */
function renderEvents() {
  if (events.length === 0) {
    eventList.innerHTML = "";
    emptyState.classList.remove("hidden");
    eventCount.textContent = "0 events";
    return;
  }

  emptyState.classList.add("hidden");
  eventCount.textContent = `${events.length} event${events.length > 1 ? "s" : ""}`;

  eventList.innerHTML = events
    .map((event, index) => {
      const color = colors[index % colors.length];
      return createEventHTML(event, index, color);
    })
    .join("");
}

/**
 * Create HTML for a single event item
 */
function createEventHTML(event, index, color) {
  const categoryStyle =
    categoryStyles[event.category] || categoryStyles["workshop"];

  return `
        <li class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
            <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-${color} rounded-full"></div>
            </div>
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs px-2 py-1 rounded ${categoryStyle.badge} font-medium">
                        ${categoryStyle.label}
                    </span>
                </div>
                <span class="text-gray-700 ${event.completed ? "line-through text-gray-400" : ""}">${event.text}</span>
            </div>
            <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onclick="toggleEvent(${index})"
                    class="px-3 py-1 text-sm ${event.completed ? "bg-gray-200 text-gray-600" : "bg-google-green text-white"} rounded hover:opacity-80 transition-opacity">
                    ${event.completed ? "Undo" : "Done"}
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
    const category = categorySelect.value;

    if (text === '') {
        alert('Please enter an event name');
        return;
    }

    events.push({
        text: text,
        category: category,
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
addEventBtn.addEventListener("click", addEvent);

eventInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addEvent();
  }
});

// Initialize app
renderEvents();
