import calendar
import json

MONTH_TO_NUMBER = {v: k - 1 for k, v in enumerate(calendar.month_name)}


def month_text_to_range(text):
    if text == "Year-round":
        return None

    ranges = [t.strip() for t in text.split(",")]
    results = []

    for r in ranges:
        r = r.split("-")
        start = MONTH_TO_NUMBER[r[0]]
        if len(r) == 1:
            end = start
        else:
            end = MONTH_TO_NUMBER[r[1]]

        results.append({
            'start': start,
            'end': end,
        })

    return results


def hour_string_to_number(hour_string):
    if "a.m." in hour_string:
        return int(hour_string.replace("a.m.", ""))
    else:
        return int(hour_string.replace("p.m.", "")) + 12


def time_text_to_range(text):
    if text == "All day":
        return None
    ranges = [t.strip() for t in text.split(",")]
    results = []
    for r in ranges:
        start, end = r.split(" - ")
        start = hour_string_to_number(start)
        end = hour_string_to_number(end)

        results.append({
            "start": start,
            "end": end,
        })

    return results


def main():
    data = {}
    with open('raw/fish.txt', 'r') as file:
        for line in file.readlines():
            fish, location, size, price, time, months = line.strip().split("\t")
            months = months.split("/")
            if len(months) == 1:
                month = months[0].replace(" (Northern and Southern)", "")
                northern = month
                southern = month
            else:
                northern, southern = months

                northern = northern.replace(" (Northern)", "")
                southern = southern.replace(" (Southern)", "")
            data[fish] = {
                "name": fish,
                "location": location,
                "size": size,
                "price": int(price.replace(",", "")),
                "time": time_text_to_range(time),
                "northenMonths": month_text_to_range(northern),
                "southernMonths": month_text_to_range(southern),
            }

    with open('json/fish.json', 'w') as file:
        json.dump(data, file)


if __name__ == '__main__':
    main()
