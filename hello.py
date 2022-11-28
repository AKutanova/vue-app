import os
from datetime import timedelta
from datetime import datetime, timedelta

from tinkoff.invest import CandleInterval, Client
from tinkoff.invest.utils import now

TOKEN = "t.2e0C_85ihdqwRcsGnQS-OEY4E1Cf0eMIAcKU5DVTxmpU-jEx0HRprD1GrjqRpAo-cHSyRI92VJ_23IakEvb2Zg"

with Client(TOKEN) as client:
    # print(client.users.get_accounts())
    # response = client.instruments.futures(instrument_status=1)
    # client.instruments.future_by(id_type = 'figi', id = 'BBG004730N88')
    

    print(datetime.today(), now() + timedelta(hours=3) - timedelta(days=1))
    # for instrument in response.instruments:
    #     if (instrument.exchange == 'FORTS'):
    #         print(instrument.name, instrument.figi, instrument.ticker)

    def ma():    
        sum = 0
        i = 0

        for candle in client.get_all_candles(
            figi = "FUTRTSM12220",
            from_= now() - timedelta(hours=23),
            interval = CandleInterval.CANDLE_INTERVAL_5_MIN,
        ):
            # print(candle.close, float(f'{candle.close.units}.{candle.close.nano}'))
            sum += float(f'{candle.close.units}.{candle.close.nano}')
            i += 1
        
        return sum/i

    def isLong():
        allCandles = list(client.get_all_candles(
            figi = "FUTRTSM12220",
            from_= now() - timedelta(minutes=15),
            # to=now() + timedelta(hours=3),
            interval = CandleInterval.CANDLE_INTERVAL_5_MIN,
        ))

        lastCandle = allCandles[-1]
        # prevCandle  = allCandles[-2]
        # print(allCandles)
        print("ma", ma())
        todayCandleClose = float(f'{lastCandle.close.units}.{lastCandle.close.nano}')
        return todayCandleClose > ma()


    def main():
        dayCandles = list(client.get_all_candles(
            figi = "FUTRTSM12220",
            from_= now() + timedelta(hours=3) - timedelta(days=1),
            to=now() + timedelta(hours=3),
            interval = CandleInterval.CANDLE_INTERVAL_DAY,
        ))

        todayCandle = dayCandles[-1]
        prevCandle  = dayCandles[-2]

        todayCandleHigh = float(f'{todayCandle.high.units}.{todayCandle.high.nano}')
        todayCandleLow  = float(f'{todayCandle.low.units}.{todayCandle.low.nano}')

        prevCandleHigh = float(f'{prevCandle.high.units}.{prevCandle.high.nano}')
        prevCandleLow  = float(f'{prevCandle.low.units}.{prevCandle.low.nano}')
        

        print(todayCandle, todayCandleHigh, todayCandleLow)
        print(prevCandle, prevCandleHigh, prevCandleLow)

        if (todayCandleHigh < prevCandleHigh) and (todayCandleLow < prevCandleLow):
            print('Шорт')
            if not isLong():
                print('Теперь точно шорт')
            else:
                print('Цена выше МА')                

        elif (todayCandleHigh > prevCandleHigh) and (todayCandleLow > prevCandleLow):
            print('Лонг')
            if isLong():
                print('Теперь точно лонг')
            else:
                print('Цена ниже МА')

        else:
            print('Ждём')
    
    main()


    