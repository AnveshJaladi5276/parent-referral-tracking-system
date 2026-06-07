const form = document.getElementById("referralForm");
const tableBody = document.getElementById("referralTableBody");
const searchInput = document.getElementById("searchInput");

let referrals = [];
let referralId = 1;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const parent = document.getElementById("parentName").value;
    const child = document.getElementById("childName").value;
    const status = document.getElementById("status").value;

    const reward = status === "Converted" ? 500 : 0;

    referrals.push({
        id: referralId++,
        parent,
        child,
        status,
        reward
    });

    renderTable();
    updateDashboard();

    form.reset();
});

function renderTable() {
    tableBody.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    referrals
        .filter(ref =>
            ref.parent.toLowerCase().includes(searchText)
        )
        .forEach(ref => {

            let statusClass = "";

            if (ref.status === "Pending") {
                statusClass = "status-pending";
            } else if (ref.status === "Converted") {
                statusClass = "status-converted";
            } else if (ref.status === "Follow-Up") {
                statusClass = "status-follow";
            } else {
                statusClass = "status-rejected";
            }

            tableBody.innerHTML += `
                <tr>
                    <td>${ref.id}</td>
                    <td>${ref.parent}</td>
                    <td>${ref.child}</td>
                    <td class="${statusClass}">
                        ${ref.status}
                    </td>
                    <td>₹${ref.reward}</td>
                </tr>
            `;
        });
}

function updateDashboard() {

    document.getElementById("totalReferrals").textContent =
        referrals.length;

    document.getElementById("pendingReferrals").textContent =
        referrals.filter(r => r.status === "Pending").length;

    document.getElementById("convertedReferrals").textContent =
        referrals.filter(r => r.status === "Converted").length;

    const rewards =
        referrals.reduce((sum, r) => sum + r.reward, 0);

    document.getElementById("rewardAmount").textContent =
        "₹" + rewards;
}

searchInput.addEventListener("keyup", renderTable);