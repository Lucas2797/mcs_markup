import datetime
from dateutil.relativedelta import relativedelta


def date_changer(date):
    if type(date) == str:
        date_save_format = datetime.date(year=int(date[6:10]), month=int(date[3:5]), day=int(date[0:2])) 
        return(date_save_format)
    else:
        return(date.strftime("%d/%m/%Y"))



def get_acumulado_ano():
    pass


print(date_changer("25/05/1998"))
print(date_changer(datetime.date(year=1998, month=5, day=25) - relativedelta(years=2)))
d1 = datetime.date(year=1998, month=5, day=25)
print(d1.year - 1)


