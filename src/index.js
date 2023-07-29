import {clipboard, display, ocr, req, res} from "enconvo/bridge";

(async () => {
    try {
        const {options} = req.body()

        const result = await ocr.screenShotOcr()
        display.showMainWindow("", {})

        if (options.auto_copy === "true") {
            clipboard.setString(result)
        }

        await res.text(result);
    } catch (e) {
        throw e;
    }
})().catch((err) => {
    console.log("error: " + err.message);
    res.error(JSON.parse(err).error.message || '未知错误')
});


