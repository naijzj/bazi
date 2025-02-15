from flask import Flask, render_template, request, redirect, url_for
import subprocess
import re

app = Flask(__name__)

def clean_output(output):
    # 使用正则表达式去除ANSI转义代码
    output = re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', output)
    # 去除其他特殊字符
    output = output.replace("•", "").replace("[0m", "").replace("[1;36;40m", "").strip()
    return output

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    year = request.form['year']
    month = request.form['month']
    day = request.form['day']
    time = request.form['time']
    gender = request.form['gender']

    # 构造命令
    cmd = [
        "python",
        "bazi.py",
        year,
        month,
        day,
        time
    ]
    if gender == '女':
        cmd.append('-n')

    # 调用bazi.py并捕获输出
    try:
        result = subprocess.check_output(cmd, universal_newlines=True)
        # 清理输出
        cleaned_result = clean_output(result)
    except subprocess.CalledProcessError as e:
        cleaned_result = f"Error: {e.output}"

    return render_template('result.html', result=cleaned_result)

if __name__ == '__main__':
    app.run(debug=True)