<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <ul class="shoppingListContent mdl-list" />
  </div>

  <div class="mdl-cell mdl-cell--8-col removeWhenEmptyCart">
    <form action="#" onsubmit="return handleCheckout()">
      <div class="mdl-grid totalCalculation">
        <div class="mdl-cell mdl-cell--6-col">
          <p>Pickup Date:</p>

          <div class="mdl-textfield mdl-js-textfield">
            <input
              required
              class="mdl-textfield__input datePicker"
              type="date"
              id="pickupDate"
            />
          </div>
        </div>
        <div class="mdl-cell mdl-cell--6-col">
          <p>Pickup Time:</p>

          <div class="mdl-textfield mdl-js-textfield">
            <input
              required
              class="mdl-textfield__input timePicker"
              type="time"
              id="pickupTime"
              min="09:00"
              max="23:59"
              value="09:30"
            />
            <span class="mdl-textfield__error">
              Please select a time between Bilka's opening hours
            </span>
          </div>
        </div>
      </div>
      <div class="total">
        <p>Service cost: DKK 10</p>
        <p>
          Total: DKK <span id="totalValue">test</span>
        </p>
        <button class="mdl-button mdl-js-button mdl-button--raised">
          Checkout!
        </button>
      </div>
    </form>
  </div>
</div>;
