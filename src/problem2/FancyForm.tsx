/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CloseOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";

const currencyList = [
  {
    currency: "BLUR",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.208115254237288,
  },
  {
    currency: "bNEO",
    date: "2023-08-29T07:10:50.000Z",
    price: 7.1282679,
  },
  {
    currency: "BUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.999183113,
  },
  {
    currency: "BUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.999878261118644,
  },
  {
    currency: "USD",
    date: "2023-08-29T07:10:30.000Z",
    price: 1,
  },
  {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.93373737374,
  },
  {
    currency: "GMX",
    date: "2023-08-29T07:10:40.000Z",
    price: 36.3451143728814,
  },
  {
    currency: "STEVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.0727670677966102,
  },
  {
    currency: "LUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.409556389830508,
  },
  {
    currency: "RATOM",
    date: "2023-08-29T07:10:40.000Z",
    price: 10.2509189152542,
  },
  {
    currency: "STRD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.738655338983051,
  },
  {
    currency: "EVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.062461813559322,
  },
  {
    currency: "IBCX",
    date: "2023-08-29T07:10:40.000Z",
    price: 41.268113559322,
  },
  {
    currency: "IRIS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.0177095593220339,
  },
  {
    currency: "ampLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.495485898305085,
  },
  {
    currency: "KUJI",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.675,
  },
  {
    currency: "STOSMO",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.431318,
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.989832,
  },
  {
    currency: "axlUSDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.989832,
  },
  {
    currency: "ATOM",
    date: "2023-08-29T07:10:50.000Z",
    price: 7.18665733333333,
  },
  {
    currency: "STATOM",
    date: "2023-08-29T07:10:45.000Z",
    price: 8.51216205084746,
  },
  {
    currency: "OSMO",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.377297433333333,
  },
  {
    currency: "rSWTH",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.00408771,
  },
  {
    currency: "STLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.442322101694915,
  },
  {
    currency: "LSI",
    date: "2023-08-29T07:10:50.000Z",
    price: 67.6966152542373,
  },
  {
    currency: "OKB",
    date: "2023-08-29T07:10:40.000Z",
    price: 42.9756205932203,
  },
  {
    currency: "OKT",
    date: "2023-08-29T07:10:40.000Z",
    price: 13.5615779661017,
  },
  {
    currency: "SWTH",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.00403985045501208,
  },
  {
    currency: "USC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.994,
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:30.000Z",
    price: 1,
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:30.000Z",
    price: 1,
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.999878261118644,
  },
  {
    currency: "WBTC",
    date: "2023-08-29T07:10:52.000Z",
    price: 26002.822020202,
  },
  {
    currency: "wstETH",
    date: "2023-08-29T07:10:40.000Z",
    price: 1872.25797423729,
  },
  {
    currency: "YieldUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 1.02908479661017,
  },
  {
    currency: "ZIL",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.0165181355932203,
  },
];

const schema = z.object({
  amount: z
    .string()
    .refine((value) => /^[0-9]*\.?[0-9]*$/.test(value), {
      message: "The value must be a valid number.",
    })
    .transform((value) => parseFloat(value)),
  fromCurrency: z.string().nonempty("The value is required."),
  toCurrency: z.string().nonempty("The value is required."),
});

type SCHEMA = z.infer<typeof schema>;
const FancyFormComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors: errors },
  } = useForm<SCHEMA>({
    resolver: zodResolver(schema),
  });

  const [convertedAmount, setConvertedAmount] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const regex = /^[0-9]*\.?[0-9]*$/;
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");
  const amount = watch("amount");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setSubmitted(false);
    setConvertedAmount(0);
  };

  const onChangeAmount = (e: any) => {
    const value = e.target.value;
    if (!regex.test(value)) {
      setError("amount", {
        type: "manual",
        message: "The value must be a valid number.",
      });
    } else {
      clearErrors("amount");
      handleChangeCurrency();
    }
  };

  const handleChangeCurrency = () => {
    const fromCurrencyData = currencyList.find(
      (c) => c.currency == fromCurrency
    );

    const toCurrencyData = currencyList.find((c) => c.currency === toCurrency);

    if (!fromCurrencyData || !toCurrencyData) {
      return;
    }

    const fromCurrencyPrice = Number(fromCurrencyData.price);
    const toCurrencyPrice = Number(toCurrencyData.price);
    if (amount) {
      const convertedPrice =
        (Number(amount) * fromCurrencyPrice) / toCurrencyPrice;
      setConvertedAmount(convertedPrice);
      setSubmitted(true);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="flex justify-center my-[20%]">
        <Button
          color="info"
          variant="outlined"
          onClick={handleClickOpen}
          className="uppercase hover:opacity-80"
          title="Click to do this"
        >
          do you want to convert the currency?
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        className="max-w-[800px] max-h-[500px] mx-auto"
      >
        <Tooltip title="Close">
          <CloseOutlined
            onClick={() => setOpen(false)}
            className="text-white absolute top-1 right-1 bg-red-500 rounded hover:opacity-80 cursor-pointer"
          />
        </Tooltip>
        <DialogTitle>
          <p className="text-xl uppercase lg:text-3xl text-center font-bold text-slate-900 py-5">
            Currency Converter
          </p>
          {submitted && (
            <p className="text-xs text-center">
              The result of transferring {""}
              <strong className="text-red-800">
                {amount + " " + fromCurrency}
              </strong>{" "}
              to <strong className="text-red-800">{toCurrency}</strong> is{" "}
              <strong className="text-red-800">{convertedAmount}</strong>
            </p>
          )}
        </DialogTitle>
        <DialogContent>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit(handleChangeCurrency)}
          >
            <div className="flex mb-10">
              <div>
                <input
                  type="text"
                  placeholder="Please enter the value"
                  {...register("amount")}
                  onChange={onChangeAmount}
                  className="border-[2px] max-w-[300px] rounded-lg max-h-10 p-2 outline-none"
                />
                <p className="text-red-600 text-xs">{errors.amount?.message}</p>
              </div>
              <div>
                <select
                  {...register("fromCurrency")}
                  name="fromCurrency"
                  id="fromCurrency"
                  className="border-[2px] rounded-lg max-h-10 p-2 outline-none mx-2"
                >
                  {currencyList.length > 0 &&
                    currencyList.map((currency, index) => {
                      return currency.price ? (
                        <option
                          key={`${currency.currency}-${index}`}
                          value={currency.currency}
                          className="text-slate-700"
                        >
                          {currency.currency}
                        </option>
                      ) : (
                        ""
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="flex mb-10">
              <div>
                <input
                  value={convertedAmount}
                  readOnly
                  className="border-[2px] max-w-[300px] rounded-lg max-h-10 p-2 outline-none"
                />
              </div>
              <div>
                <select
                  {...register("toCurrency")}
                  name="toCurrency"
                  id="toCurrency"
                  className="border-[2px] rounded-lg max-h-10 p-2 outline-none mx-2"
                >
                  {currencyList.length > 0 &&
                    currencyList.map((currency, index) => {
                      return currency.price ? (
                        <option
                          key={`${currency.currency}-${index}`}
                          value={currency.currency}
                          className="text-slate-700"
                        >
                          {currency.currency}
                        </option>
                      ) : (
                        ""
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <Tooltip title="Click to transfer">
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="bg-sky-800 text-white px-3 py-2 rounded-lg hover:shadow-lg mx-1"
                >
                  Transfer
                </Button>
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  type="reset"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setConvertedAmount(0);
                    setSubmitted(false);
                  }}
                  className="bg-black text-white px-3 py-2 rounded-lg hover:shadow-lg mx-1"
                >
                  Cancel
                </Button>
              </Tooltip>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FancyFormComponent;
