"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { currencyList } from "../../libs/data";
import { CloseOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";

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
const ConvertCurrencyForm = () => {
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

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default ConvertCurrencyForm;
