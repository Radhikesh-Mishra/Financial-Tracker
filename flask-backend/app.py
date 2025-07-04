from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd
from datetime import datetime, timedelta
import pytz

app = Flask(__name__)
CORS(app)

@app.route('/analyze-expenses', methods=['POST'])
def analyze_expenses():
    try:
        data = request.get_json()
        expenses = pd.DataFrame(data)

        expenses['date'] = pd.to_datetime(expenses['date'], utc=True)

        now = datetime.now(pytz.UTC)
        thirty_days_ago = now - timedelta(days=30)

        recent_expenses = expenses[expenses['date'] >= thirty_days_ago]

        expenses['amount'] = pd.to_numeric(expenses['amount'], errors='coerce')
        if expenses['amount'].isnull().any():
            return jsonify({"error": "Some 'amount' values are invalid or missing"}), 400

        category_summary = recent_expenses.groupby('category')['amount'].sum().sort_values(ascending=False)

        suggestions = []

        for category, amount in category_summary.items():
            if amount > 5000:
                suggestions.append(f"You're spending a lot on {category}. Try to reduce it by 15%.")
            elif amount > 3000:
                suggestions.append(f"Your {category} expenses are increasing. Monitor them closely.")

        before_thirty_days = expenses[
            (expenses['date'] < thirty_days_ago) &
            (expenses['date'] >= thirty_days_ago - timedelta(days=30))
        ]

        current = recent_expenses.groupby('category')['amount'].sum()
        previous = before_thirty_days.groupby('category')['amount'].sum()

        for category in current.index:
            current_amount = current[category]
            previous_amount = previous.get(category, 0)
            if previous_amount > 0 and current_amount > previous_amount * 1.5:
                suggestions.append(f"Your {category} expenses increased a lot this month compared to last month.")

        return jsonify({
            "summary": category_summary.to_dict(),
            "suggestions": suggestions
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
