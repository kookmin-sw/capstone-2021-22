import pymysql
import pandas as pd
xlsx = pd.read_excel('./file_name')
conn = pymysql.connect(host='localhost', user='root', password='password', db='db_name', charset='utf8', autocommit=True)


curs = conn.cursor()
sql = """insert into PILLS(id, name,class,shape) values (%s,%s, %s, %s)"""
select = """ SELECT * FROM PILLS WHERE id = %s"""

for index in range(0,len(xlsx)):
    try:
        curs.execute(sql, (int(xlsx['품목일련번호'][index]),xlsx['품목명'][index], xlsx['분류명'][index], xlsx['제형코드명'][index]))

    except pymysql.err.IntegrityError:
        #고유번호 중복 예외처리
        continue
    except pymysql.err.ProgrammingError: 
        #빈 항목 발생 예외처리
        if(curs.execute(select, (int(xlsx['품목일련번호'][index])))):
            continue
        else:
            if((not xlsx['제형코드명'][index]) and (not xlsx['분류명'][index] ) ):
                curs.execute(sql, (int(xlsx['품목일련번호'][index]),xlsx['품목명'][index], '분류명 없음', '제형코드명 없음'))
            elif(not xlsx['제형코드명'][index]):
                curs.execute(sql, (int(xlsx['품목일련번호'][index]),xlsx['품목명'][index], xlsx['분류명'][index], '제형코드명 없음'))
            elif(not xlsx['분류명'][index] ):
                curs.execute(sql, (int(xlsx['품목일련번호'][index]),xlsx['품목명'][index], '분류명 없음', xlsx['제형코드명'][index]))
  

 
conn.close()